import { GITHUB_OWNER, GITHUB_REPO } from './site-constants';

export {
  GITHUB_OWNER,
  GITHUB_REPO,
  SUPPORT_EMAIL,
  SITE_URL,
  PLAY_PACKAGE_ID,
  githubRepoUrl,
  discussionNewUrl,
  issueNewUrl,
  discussionsCategoryUrl,
  issuesLabelUrl,
  formatDate,
} from './site-constants';

export type { GitHubIssue, GitHubDiscussion } from './types';

import type { GitHubDiscussion, GitHubIssue } from './types';

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'semperdic-website',
  };
  const token = import.meta.env.GITHUB_TOKEN as string | undefined;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchOpenIssues(label: string, limit = 12): Promise<GitHubIssue[]> {
  const q = encodeURIComponent(`repo:${GITHUB_OWNER}/${GITHUB_REPO} is:issue is:open label:${label}`);
  const url = `https://api.github.com/search/issues?q=${q}&sort=created&order=desc&per_page=${limit}`;
  try {
    const res = await fetch(url, { headers: githubHeaders() });
    if (!res.ok) return [];
    const data = (await res.json()) as { items?: GitHubIssue[] };
    return data.items ?? [];
  } catch {
    return [];
  }
}

type DiscussionsGraphQLResponse = {
  data?: {
    repository?: {
      discussions?: {
        nodes?: Array<{
          number: number;
          title: string;
          url: string;
          createdAt: string;
          author: { login: string } | null;
          category: { name: string; slug: string } | null;
        } | null>;
      };
    };
  };
  errors?: Array<{ message: string }>;
};

/** Requires GITHUB_TOKEN at build time for GraphQL; otherwise returns []. */
export async function fetchDiscussions(opts?: {
  categorySlug?: string;
  limit?: number;
}): Promise<GitHubDiscussion[]> {
  const limit = opts?.limit ?? 12;
  const query = `
    query($owner: String!, $repo: String!, $limit: Int!) {
      repository(owner: $owner, name: $repo) {
        discussions(first: $limit, orderBy: { field: CREATED_AT, direction: DESC }) {
          nodes {
            number
            title
            url
            createdAt
            author { login }
            category { name slug }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        ...githubHeaders(),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          owner: GITHUB_OWNER,
          repo: GITHUB_REPO,
          limit: Math.min(limit * 3, 50),
        },
      }),
    });
    if (!res.ok) return [];
    const json = (await res.json()) as DiscussionsGraphQLResponse;
    if (json.errors?.length) return [];
    const nodes = json.data?.repository?.discussions?.nodes ?? [];
    let list: GitHubDiscussion[] = nodes
      .filter((n): n is NonNullable<typeof n> => n != null)
      .map((n) => ({
        number: n.number,
        title: n.title,
        url: n.url,
        createdAt: n.createdAt,
        author: n.author,
        category: n.category,
      }));
    if (opts?.categorySlug) {
      list = list.filter((d) => d.category?.slug === opts.categorySlug);
    }
    return list.slice(0, limit);
  } catch {
    return [];
  }
}
