export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  verdict: string;
  subject: string;
  sources: string[];
  status: string;
  factCheckScore: number;
  createdAt: Date;
  updatedAt: Date;
} 