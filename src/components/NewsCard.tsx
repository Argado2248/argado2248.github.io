import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  verdict: string;
  subject: string;
  sources: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NewsCardProps {
  article: Article | undefined;
}

export default function NewsCard({ article }: NewsCardProps) {
  if (!article) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {article.subject && (
            <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
              {article.subject}
            </span>
          )}
          <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${
            article.status === 'APPROVED' ? 'bg-green-600' :
            article.status === 'PENDING' ? 'bg-yellow-600' :
            'bg-red-600'
          }`}>
            {article.status === 'APPROVED' ? 'Granskad' :
             article.status === 'PENDING' ? 'Väntar' :
             'Avvisad'}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-900">
          {article.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.summary}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(article.createdAt).toLocaleDateString('sv-SE')}
          </span>
          <Link 
            href={`/article/${article.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Läs mer →
          </Link>
        </div>
      </div>
    </div>
  );
} 