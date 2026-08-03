import site from '../site.config.json';

export const GITHUB_OWNER = site.github.owner;
export const GITHUB_REPO = site.github.repo;
export const SUPPORT_EMAIL = site.supportEmail;
export const SITE_URL = site.siteUrl;
export const PLAY_PACKAGE_ID = site.playPackageId;

export const githubRepoUrl = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;

/** Join the Astro `base` with a site path (`/download` → `/website/download/`). */
export function withBase(path = '/'): string {
  const base = import.meta.env.BASE_URL || '/';
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  if (!normalized) return base.endsWith('/') ? base : `${base}/`;
  const prefix = base.endsWith('/') ? base : `${base}/`;
  const isFile = /\.[a-z0-9]+$/i.test(normalized);
  if (isFile || normalized.endsWith('/')) {
    return `${prefix}${normalized}`;
  }
  return `${prefix}${normalized}/`;
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
