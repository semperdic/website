# Repository status

Canonical public repo: **https://github.com/semperdic/website**

- Discussions: enabled
- Issues + templates: in `.github/ISSUE_TEMPLATE/`
- Site: GitHub Pages → https://semperdic.github.io/website/

## Discussion categories

Create or confirm these under the Discussions tab (Settings → Discussions):

| Name | Format |
|------|--------|
| Announcements | Announcement |
| Q&A | Q&A |
| Ideas | Open discussion |
| General | Open discussion |

## Labels

`bug`, `enhancement`, `needs-triage` (create if missing).

## Site config

[`src/site.config.json`](../src/site.config.json) should read:

```json
"github": { "owner": "semperdic", "repo": "website" },
"siteUrl": "https://semperdic.github.io/website"
```

When moving to a custom domain, follow [HOSTING.md](HOSTING.md).
