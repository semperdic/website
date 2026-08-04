import site from '../site.config.json';

export const GITHUB_OWNER = site.github.owner;
export const GITHUB_REPO = site.github.repo;
export const SUPPORT_EMAIL = site.supportEmail;
export const SITE_URL = site.siteUrl;
export const PLAY_PACKAGE_ID = site.playPackageId;

export const githubRepoUrl = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;

/** Join the Astro `base` with a site path (`/download` → `/website/download/`).
 *  Any `#hash` or `?query` is split off first so the trailing slash lands on the
 *  path, not the fragment (`/manual#roi` → `/website/manual/#roi`). */
export function withBase(path = '/'): string {
  const base = import.meta.env.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  const suffixIdx = path.search(/[?#]/);
  const suffix = suffixIdx >= 0 ? path.slice(suffixIdx) : '';
  const bare = suffixIdx >= 0 ? path.slice(0, suffixIdx) : path;
  const normalized = bare.startsWith('/') ? bare.slice(1) : bare;
  if (!normalized) return `${prefix}${suffix}`;
  const isFile = /\.[a-z0-9]+$/i.test(normalized);
  const withSlash = isFile || normalized.endsWith('/') ? normalized : `${normalized}/`;
  return `${prefix}${withSlash}${suffix}`;
}

export function discussionNewUrl(categorySlug: string): string {
  return `${githubRepoUrl}/discussions/new?category=${encodeURIComponent(categorySlug)}`;
}

export function issueNewUrl(template: string): string {
  return `${githubRepoUrl}/issues/new?template=${encodeURIComponent(template)}`;
}

export function discussionsCategoryUrl(categorySlug: string): string {
  return `${githubRepoUrl}/discussions/categories/${encodeURIComponent(categorySlug)}`;
}

export function issuesLabelUrl(label: string): string {
  return `${githubRepoUrl}/issues?q=is%3Aissue+is%3Aopen+label%3A${encodeURIComponent(label)}`;
}

export function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
