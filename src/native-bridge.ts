import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { PushNotifications } from '@capacitor/push-notifications';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

// Expose minimal native helpers for the web app running inside the WebView
export async function ensurePushPermission(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;
  const permStatus = await PushNotifications.checkPermissions();
  if (permStatus.receive === 'denied') {
    const req = await PushNotifications.requestPermissions();
    return req.receive === 'granted';
  }
  return permStatus.receive === 'granted';
}

export async function registerForPush(): Promise<string | null> {
  if (!Capacitor.isNativePlatform()) return null;
  return new Promise<string | null>(async (resolve) => {
    await PushNotifications.register();
    const tokenListener = PushNotifications.addListener('registration', (token) => {
      resolve(token.value);
      tokenListener.remove();
    });
    const errorListener = PushNotifications.addListener('registrationError', () => {
      resolve(null);
      errorListener.remove();
    });
  });
}

export async function saveSecure(key: string, value: string) {
  await SecureStoragePlugin.set({ key, value });
}

export async function getSecure(key: string) {
  try {
    const v = await SecureStoragePlugin.get({ key });
    return v?.value ?? null;
  } catch {
    return null;
  }
}

export function onAppUrlOpen(callback: (url: string) => void) {
  if (!Capacitor.isNativePlatform()) return () => {};
  const sub = App.addListener('appUrlOpen', (data) => {
    if (data?.url) callback(data.url);
  });
  return () => sub.remove();
}


