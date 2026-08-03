# GitHub org + repo setup

GitHub does not allow creating organizations via the API for personal accounts. Do this once in the browser, then push this codebase.

## 1. Create the organization

1. Sign in as the owner account: https://github.com/account/organizations/new
2. Organization name: **`semperdic`**
3. Complete the free plan flow.

## 2. Create the repository

From this directory (after the org exists):

```bash
gh repo create semperdic/website --public --source=. --remote=origin --push --homepage "https://semperdic.com" --description "Semper product site and community (Discussions + Issues)"
```

Or create an empty `website` repo in the org UI, then:

```bash
git remote add origin https://github.com/semperdic/website.git
git push -u origin main
```

## 3. Enable Discussions and categories

```bash
gh api -X PATCH repos/semperdic/website -f has_discussions=true
```

In the repo → **Settings → General → Features → Discussions**, then create categories:

| Name | Format | Slug (typical) |
|------|--------|----------------|
| Announcements | Announcement | announcements |
| Q&A | Q&A | q-a |
| Ideas | Discussion | ideas |
| General | Discussion | general |

Labels used by issue templates: `bug`, `enhancement`, `needs-triage` (create under Issues → Labels if missing).

## 4. Firebase Hosting + domain

See [docs/HOSTING.md](docs/HOSTING.md).
