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
    StatusBar: {
      // 어두운 배경에 밝은 아이콘/텍스트
      style: 'LIGHT',
      // Android에서 상태바 배경색 적용 (iOS는 스타일만 적용)
      backgroundColor: '#0b0e14',
      // 웹뷰 위에 오버레이하지 않고, 시스템 바 아래에서 레이아웃
      overlays: false
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;


