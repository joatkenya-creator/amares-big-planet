export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: "Parenting Tips" | "Behind the Scenes" | "Activities";
  readTime: string;
  publishDate: string;
  body: string;
}

export const articles: Article[] = [];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, count = 2): Article[] {
  return articles.filter((a) => a.slug !== slug).slice(0, count);
}
