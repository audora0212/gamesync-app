import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cloud.gamesync.app',
  appName: 'GameSync',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    // We are loading the production Next.js site in a webview
    // and also allow live reload during development
    url: 'https://gamesync.cloud',
    cleartext: false,
    allowNavigation: ['gamesync.cloud', '*.gamesync.cloud']
  },
  android: {
    allowMixedContent: false,
    captureInput: true
  },
  ios: {
    contentInset: 'automatic'
  },
  plugins: {
    App: {
      allowBackground: true,
      backgroundColor: '#0b0e14'
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;


