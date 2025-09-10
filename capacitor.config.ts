import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f353a9e7aa27471aa46d120f5cdb6aed',
  appName: 'Hack Whisperer',
  webDir: 'dist',
  server: {
    url: 'https://f353a9e7-aa27-471a-a46d-120f5cdb6aed.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;