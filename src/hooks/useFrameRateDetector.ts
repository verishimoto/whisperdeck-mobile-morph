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

  const measureFrame = useCallback(() => {
    frameCountRef.current++;
    rafIdRef.current = requestAnimationFrame(measureFrame);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setResult({ fps: 60, performanceLevel: 'high', isStable: true });
      return;
    }

    // Start measuring frames
    frameCountRef.current = 0;
    lastTimeRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(measureFrame);

    // Calculate FPS periodically
    const intervalId = setInterval(() => {
      const now = performance.now();
      const elapsed = now - lastTimeRef.current;
      const fps = Math.round((frameCountRef.current / elapsed) * 1000);
      
      // Reset counters
      frameCountRef.current = 0;
      lastTimeRef.current = now;

      const level = getPerformanceLevel(fps);
      
      // Track consecutive readings for stability
      consecutiveReadingsRef.current.push(level);
      if (consecutiveReadingsRef.current.length > stabilityThreshold) {
        consecutiveReadingsRef.current.shift();
      }

      const isStable = consecutiveReadingsRef.current.length >= stabilityThreshold &&
        consecutiveReadingsRef.current.every(l => l === level);

      setResult({
        fps,
        performanceLevel: level,
        isStable,
      });
    }, sampleInterval);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      clearInterval(intervalId);
    };
  }, [enabled, sampleInterval, measureFrame, stabilityThreshold]);

  // Re-check at longer intervals to catch performance recovery
  useEffect(() => {
    if (!enabled) return;

    const checkId = setInterval(() => {
      // Reset stability tracking to allow recovery detection
      consecutiveReadingsRef.current = [];
    }, checkInterval);

    return () => clearInterval(checkId);
  }, [enabled, checkInterval]);

  return result;
}
