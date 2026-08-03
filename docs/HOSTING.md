# Firebase Hosting + semperdic.com

Marketing site hosting is **separate** from the Android auth App Links project (`indicvision-dic-app-auth`). Do not point email-link continue URLs at semperdic.com unless you also update Digital Asset Links and the app.

## One-time setup

1. Install Firebase CLI (`npm i -g firebase-tools` or use the local `firebase-tools` from this repo).
2. Log in and create (or select) a Firebase project for the product site, e.g. `semperdic-web`:

   ```bash
   npx firebase login
   npx firebase projects:create semperdic-web --display-name "Semper DIC website"
   ```

3. Wire this directory:

   ```bash
   npx firebase use semperdic-web
   # or: firebase use --add
   ```

4. Confirm [`.firebaserc`](../.firebaserc) and [`firebase.json`](../firebase.json) point at that project and `dist/` (Astro output).

5. Deploy:

   ```bash
   npm run build
   npx firebase deploy --only hosting
   ```

## Custom domain (semperdic.com + www)

1. Firebase Console → Hosting → **Add custom domain** → `semperdic.com`.
2. Add the DNS records Firebase shows (A/AAAA or CNAME) at your registrar.
3. Add `www.semperdic.com` and redirect www → apex (or the reverse) as Firebase suggests.
4. Wait for SSL provisioning.
5. Set the GitHub repo homepage to `https://semperdic.com`.

## Manual APK files

- Put versioned APKs in Firebase Storage or upload into Hosting under `public/downloads/` before build (large binaries: prefer Storage + public URL in the manifest).
- Keep [`public/downloads/manifest.json`](../public/downloads/manifest.json) in git; update it each release (see [RELEASING.md](../RELEASING.md)).
- Hosting `ignore` should not block `downloads/*` unless you intentionally serve APKs only from Storage.

## CI (optional)

A workflow can run `npm ci && npm run build && firebase deploy --only hosting` on push to `main` using a Firebase CI token (`firebase login:ci`). Not required for v1.
