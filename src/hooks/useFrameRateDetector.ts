import { useState, useEffect, useRef, useCallback } from 'react';

export type PerformanceLevel = 'high' | 'medium' | 'low' | 'critical';

interface FrameRateResult {
  fps: number;
  performanceLevel: PerformanceLevel;
  isStable: boolean;
}

interface UseFrameRateDetectorOptions {
  sampleInterval?: number; // How long to sample FPS (ms)
  checkInterval?: number; // How often to check (ms)
  stabilityThreshold?: number; // How many consistent readings before stable
  enabled?: boolean;
}

const FPS_THRESHOLDS = {
  high: 55,    // 55+ FPS = full effects
  medium: 40,  // 40-54 FPS = reduced blur, keep animations
  low: 25,     // 25-39 FPS = minimal blur, reduce animations
  // Below 25 = critical
};

function getPerformanceLevel(fps: number): PerformanceLevel {
  if (fps >= FPS_THRESHOLDS.high) return 'high';
  if (fps >= FPS_THRESHOLDS.medium) return 'medium';
  if (fps >= FPS_THRESHOLDS.low) return 'low';
  return 'critical';
}

export function useFrameRateDetector({
  sampleInterval = 2000,
  checkInterval = 5000,
  stabilityThreshold = 3,
  enabled = true,
}: UseFrameRateDetectorOptions = {}): FrameRateResult {
  const [result, setResult] = useState<FrameRateResult>({
    fps: 60,
    performanceLevel: 'high',
    isStable: false,
  });

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafIdRef = useRef<number | null>(null);
  const consecutiveReadingsRef = useRef<PerformanceLevel[]>([]);

  const stableRef = useRef(false);

  const startMeasuring = useCallback(() => {
    if (rafIdRef.current) return;
    frameCountRef.current = 0;
    lastTimeRef.current = performance.now();
    const loop = () => {
      frameCountRef.current++;
      rafIdRef.current = requestAnimationFrame(loop);
    };
    rafIdRef.current = requestAnimationFrame(loop);
  }, []);

  const stopMeasuring = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setResult({ fps: 60, performanceLevel: 'high', isStable: true });
      return;
    }

    stableRef.current = false;
    startMeasuring();

    const intervalId = setInterval(() => {
      const now = performance.now();
      const elapsed = now - lastTimeRef.current;
      const fps = Math.round((frameCountRef.current / elapsed) * 1000);
      
      frameCountRef.current = 0;
      lastTimeRef.current = now;

      const level = getPerformanceLevel(fps);
      
      consecutiveReadingsRef.current.push(level);
      if (consecutiveReadingsRef.current.length > stabilityThreshold) {
        consecutiveReadingsRef.current.shift();
      }

      const isStable = consecutiveReadingsRef.current.length >= stabilityThreshold &&
        consecutiveReadingsRef.current.every(l => l === level);

      setResult({ fps, performanceLevel: level, isStable });

      // Stop RAF loop once stable to save CPU
      if (isStable && !stableRef.current) {
        stableRef.current = true;
        stopMeasuring();
      }
    }, sampleInterval);

    return () => {
      stopMeasuring();
      clearInterval(intervalId);
    };
  }, [enabled, sampleInterval, startMeasuring, stopMeasuring, stabilityThreshold]);

  // Re-check at longer intervals to catch performance recovery
  useEffect(() => {
    if (!enabled) return;

    const checkId = setInterval(() => {
      // Reset stability tracking and restart measuring
      consecutiveReadingsRef.current = [];
      stableRef.current = false;
      startMeasuring();
    }, checkInterval);

    return () => clearInterval(checkId);
  }, [enabled, checkInterval, startMeasuring]);

  return result;
}
