import React from "react";

interface NewsCardProps {
  news: {
    id: number;
    title: string;
    summary: string;
    status: string;
    image: string;
    date: string;
  };
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <article className="bg-white rounded-2xl shadow-md flex flex-col sm:flex-row gap-4 p-4 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex-shrink-0 w-full sm:w-40 h-32 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
        {/* Placeholder for image */}
        <img src={news.image} alt="" className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-xl font-semibold mb-1">{news.title}</h2>
          <p className="text-gray-600 mb-2">{news.summary}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">{news.date}</span>
          <span className="text-xs rounded-full bg-purple-50 text-purple-700 px-3 py-1 font-medium">{news.status}</span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard; 