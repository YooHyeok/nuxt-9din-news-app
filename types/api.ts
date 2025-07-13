export interface ApiStructure {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string; };
  title: string;
  url: string;
  urlToImage: string;
}