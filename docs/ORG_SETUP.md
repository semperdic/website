# GitHub org + repo setup

## Current state

The public site + community repo is live at:

**https://github.com/damodar-datta/semperdic-website**

Discussions should be enabled (Settings → Features). Issue templates and labels (`bug`, `enhancement`, `needs-triage`) ship in `.github/`. Site config (`src/site.config.json`) points at this repo so deep links work today.

## Create org `semperdic` and transfer (when ready)

GitHub does not allow creating organizations via the API for personal accounts.

1. Create the org: https://github.com/account/organizations/new — name **`semperdic`**.
2. Transfer the repo: Settings → General → Danger Zone → **Transfer ownership** → `semperdic`.
3. Rename the repo to **`website`** (Settings → General → Repository name) so the canonical path is `semperdic/website`.
4. Update [`src/site.config.json`](../src/site.config.json):

   ```json
   "github": { "owner": "semperdic", "repo": "website" }
   ```

5. Update hard-coded GitHub URLs in [`README.md`](../README.md) and [`.github/ISSUE_TEMPLATE/config.yml`](../.github/ISSUE_TEMPLATE/config.yml).
6. Confirm Discussion categories exist: **Announcements**, **Q&A**, **Ideas**, **General**.
7. Redeploy the site after changing `site.config.json`.

## Discussion categories

| Name | Format |
|------|--------|
| Announcements | Announcement |
| Q&A | Q&A |
| Ideas | Open discussion |
| General | Open discussion |

## Firebase Hosting + domain

See [HOSTING.md](HOSTING.md).
