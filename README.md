## GameSync Capacitor Wrapper

This wraps `https://gamesync.cloud` into a Capacitor app (Android/iOS) and adds native push, deep links, and secure storage.

### Quick start
1) Install deps: `pnpm install` (or `npm install`)
2) Add platform: `pnpm android:add` (and later `pnpm ios:add` on mac/Codemagic)
3) Sync native: `pnpm cap:sync`
4) Open Android Studio: `pnpm android:open`

### Deep links
- Custom scheme: `gamesync://oauth/callback`
- Universal links: `https://gamesync.cloud/*`

Android: define intent-filters after `cap add android` (see below template).
iOS: set Associated Domains and URL Types, host AASA on the web (added in `gamesync-frontend/public`).

### Push
- Add `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
- Use `@capacitor/push-notifications` from web context when `window.Capacitor` exists.

### CI/CD
See `codemagic.yaml` at repo root for Android Internal and iOS TestFlight workflows.


### Android intent-filters (AndroidManifest.xml)
```xml
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="https" android:host="gamesync.cloud" />
  <data android:scheme="gamesync" />
  <data android:host="oauth" android:pathPrefix="/callback" />
  <data android:host="auth" android:pathPrefix="/" />
  <data android:pathPrefix="/" />
  <data android:mimeType="text/html" />
  <data android:mimeType="application/json" />
  <data android:mimeType="*/*" />
  <data android:scheme="https" android:host="*.gamesync.cloud" />
  <data android:scheme="https" android:host="gamesync.cloud" android:pathPrefix="/" />
</intent-filter>
```

### iOS Associated Domains
- Enable Associated Domains: `applinks:gamesync.cloud`
- Add URL Types: `gamesync` (Identifier `cloud.gamesync.app`)


