import Parser from 'rss-parser';

const parser = new Parser();

const FEEDS = [
  'https://www.dn.se/rss',
  'https://www.svd.se/feed/articles.rss',
  'https://www.nwt.se/feed',
  'https://www.tv4.se/rss'
];

export interface RssArticle {
  title: string;
  link: string;
  content: string;
  contentSnippet: string;
  pubDate: string;
  source: string;
}

export async function getLatestRssArticles(): Promise<RssArticle[]> {
  const articles: RssArticle[] = [];

  for (const feedUrl of FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const feedArticles = feed.items.map(item => ({
        title: item.title || '',
        link: item.link || '',
        content: item.content || item.contentSnippet || '',
        contentSnippet: item.contentSnippet || '',
        pubDate: item.pubDate || new Date().toISOString(),
        source: feed.title || 'Unknown Source'
      }));
      articles.push(...feedArticles);
    } catch (error) {
      console.error(`Error fetching feed ${feedUrl}:`, error);
      continue;
    }
  }

  // Sort by date, newest first
  return articles.sort((a, b) => 
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
} 