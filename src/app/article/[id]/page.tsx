import { getArticleById } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = await getArticleById(resolvedParams.id);
  if (!article) return notFound();

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 mb-8">
          <span className="text-sm text-gray-500">
            {new Date(article.createdAt).toLocaleDateString('sv-SE')}
          </span>
          <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${
            article.status === 'APPROVED' ? 'bg-green-600' :
            article.status === 'PENDING' ? 'bg-yellow-600' :
            'bg-red-600'
          }`}>
            {article.status === 'APPROVED' ? 'Granskad' :
             article.status === 'PENDING' ? 'Väntar' :
             'Avvisad'}
          </span>
          {article.subject && (
            <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
              {article.subject}
            </span>
          )}
        </div>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-8">{article.summary}</p>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Faktakoll</h2>
            <p className="text-gray-700">{article.verdict}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Källor</h2>
            <ul className="list-disc list-inside">
              {article.sources.map((source, index) => (
                <li key={index} className="text-gray-700">{source}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
} 