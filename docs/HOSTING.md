# Hosting — GitHub Pages (v1)

v1 ships on **GitHub Pages** at:

**https://semperdic.github.io/website/**

The org apex **https://semperdic.github.io/** is a separate public repo,
[`semperdic/semperdic.github.io`](https://github.com/semperdic/semperdic.github.io), that redirects
to `/website/`. The Astro product site stays in this repo (`semperdic/website`).

No custom domain is required yet. When you outgrow Pages, point `semperdic.com` at Pages (or migrate to Firebase/Cloudflare) using the section below.

## How deploy works

Push to `main` runs [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml):

1. `npm ci` + `npm run build` (Astro static output in `dist/`)
2. Upload Pages artifact
3. Deploy to the `github-pages` environment

One-time repo setup (Actions → Pages):

```bash
gh api -X POST repos/semperdic/website/pages -f build_type=workflow
# or: Settings → Pages → Build and deployment → GitHub Actions
```

Astro is configured with `site: https://semperdic.github.io` and `base: '/website'` so asset and nav URLs work under the project path.

## Manual APK files

Prefer **GitHub Releases** on this repo for APK binaries (avoids large git blobs), then put the full asset URL in [`public/downloads/manifest.json`](../public/downloads/manifest.json):

```json
{
  "apkUrl": "https://github.com/semperdic/website/releases/download/v1.0/semper-1.0.apk"
}
```

Small files can also live under `public/downloads/` and use a site-relative path like `/downloads/semper-1.0.apk` (resolved with the `/website` base at build time).

See [RELEASING.md](../RELEASING.md).

## Later: custom domain (semperdic.com)

1. Register `semperdic.com`.
2. Repo Settings → Pages → Custom domain → `semperdic.com` (and `www` if desired).
3. Add the DNS records GitHub shows.
4. Update [`astro.config.mjs`](../astro.config.mjs): `site: 'https://semperdic.com'`, `base: '/'`.
5. Update [`src/site.config.json`](../src/site.config.json) `siteUrl` and app Help & support URLs.
6. Redeploy.

Firebase Hosting is **not** used for v1 (auth App Links stay on the existing IndicVision Firebase project).
