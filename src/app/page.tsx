"use client";

import { getArticles } from "@/lib/db";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import { Article } from "@/types";
import { useState, useEffect } from "react";

const categories = [
  "Alla",
  "Politik",
  "Ekonomi",
  "Vetenskap",
  "Hälsa",
  "Miljö",
  "Teknik",
  "Kultur",
  "Sport",
  "Gäng",
  "Samhälle"
];

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Alla");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles/approved');
        const data = await response.json();
        if (data.success) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = selectedCategory === "Alla"
    ? articles
    : articles.filter(article => article.subject.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-8">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Faktakoll av nyheter och rykten
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Vi granskar och analyserar aktuella nyheter och rykten för att hjälpa dig att skilja fakta från fiktion.
            </p>
          </div>
          <Link 
            href="/hur-vi-arbetar"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Hur vi arbetar
          </Link>
        </div>

        {/* Category Badges */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />
      </div>

      {/* Articles Grid */}
      <div className="max-w-5xl mx-auto">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Laddar artiklar...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {selectedCategory !== "Alla"
                ? `Inga artiklar hittades i kategorin "${selectedCategory}"`
                : "Inga artiklar tillgängliga just nu"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link 
                key={article.id} 
                href={`/article/${article.id}`}
                className="group block"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2 group-hover:text-purple-700 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        article.factCheckScore >= 80 ? 'bg-green-100 text-green-700' :
                        article.factCheckScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {article.factCheckScore}% Faktakoll
                      </span>
                      <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium">
                        {article.subject}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}