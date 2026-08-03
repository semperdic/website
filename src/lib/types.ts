export type GitHubIssue = {
  number: number;
  title: string;
  html_url: string;
  created_at: string;
  user: { login: string } | null;
  labels: Array<{ name: string } | string>;
};

export type GitHubDiscussion = {
  number: number;
  title: string;
  url: string;
  createdAt: string;
  author: { login: string } | null;
  category: { name: string; slug: string } | null;
};
