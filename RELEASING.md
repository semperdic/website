# Releasing Semper (public distribution)

The private app repository builds the signed APK. **This repo does not auto-publish builds.** Each customer-facing release is manual.

## Checklist

1. **Build** a signed release APK from the private IndicVisionDIC Release workflow (or local release assemble).
2. **Upload the APK** to Firebase Hosting / Cloud Storage under a stable URL, for example:
   - `https://semperdic.com/downloads/semper-<version>.apk`
   - Prefer uploading via Firebase Console or `gsutil` / Storage — avoid committing large APKs to git.
3. **Update** [`public/downloads/manifest.json`](public/downloads/manifest.json):

   ```json
   {
     "version": "1.0",
     "versionCode": 42,
     "apkUrl": "/downloads/semper-1.0.apk",
     "apkSha256": "optional-hex-digest",
     "notes": "Short changelog for testers.",
     "playStoreUrl": "https://play.google.com/store/apps/details?id=com.indicvision.semper",
     "publishedAt": "2026-08-03"
   }
   ```

4. **Deploy the site** (so the manifest and any static files go live):

   ```bash
   npm run build
   firebase deploy --only hosting
   ```

5. **Publish** the same build on Google Play (internal / closed / production as appropriate).
6. **Announce** (optional): pin a Discussion under **Announcements** on this repository.

## Verify

- Open https://semperdic.com/download — version and links match the manifest.
- Direct APK URL returns `application/vnd.android.package-archive` (or a Storage redirect).
- Play Store listing opens for the package `com.indicvision.semper`.

## Private vs public

| Step | Where |
|------|--------|
| Sign APK | Private IndicVisionDIC `release.yml` |
| Host APK + site | This repo → Firebase Hosting |
| Store listing | Google Play Console |
| Customer Q&A / bugs | This repo Discussions / Issues |
