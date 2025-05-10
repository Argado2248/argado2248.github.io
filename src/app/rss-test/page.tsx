import Parser from 'rss-parser';

const RSS_URL = 'https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/';

export const dynamic = 'force-dynamic'; // Ensure SSR for fresh data

async function getRssArticles() {
  const parser = new Parser();
  const feed = await parser.parseURL(RSS_URL);
  return feed.items.slice(0, 5); // Get the first 5 articles
}

export default async function RssTestPage() {
  const articles = await getRssArticles();

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Aftonbladet: Senaste Nytt (RSS Test)</h1>
      <ul className="space-y-6">
        {articles.map((item, idx) => (
          <li key={idx} className="bg-gray-50 rounded-xl p-4 shadow border border-gray-100">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-purple-700 hover:underline">
              {item.title}
            </a>
            <div className="text-xs text-gray-500 mt-1">{item.pubDate}</div>
            {item.contentSnippet && (
              <p className="text-gray-700 text-sm mt-2 line-clamp-3">{item.contentSnippet}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 