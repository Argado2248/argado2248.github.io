"use client";

import React, { useState, useEffect } from "react";
import { Article } from "@/types";

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch pending articles on component mount
  useEffect(() => {
    const fetchPendingArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        if (data.success) {
          setArticles(data.articles);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      }
    };

    fetchPendingArticles();
  }, []);

  const handleGenerateArticles = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      
      const response = await fetch('/api/generate-articles', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate articles');
      }

      const data = await response.json();
      
      if (data.success) {
        // Refresh the articles list
        const articlesResponse = await fetch('/api/articles');
        const articlesData = await articlesResponse.json();
        setArticles(articlesData.articles);
      } else {
        throw new Error(data.error || 'Failed to generate articles');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/articles/${id}/approve`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to approve article');
      }

      // Remove the approved article from the list
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve article');
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/articles/${id}/reject`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to reject article');
      }

      // Remove the rejected article from the list
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject article');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 py-8">
      <header className="mb-8 flex items-center justify-between max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight">Adminpanel: Artiklar för godkännande</h1>
        <button
          onClick={handleGenerateArticles}
          disabled={isGenerating}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isGenerating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {isGenerating ? 'Genererar...' : 'Generera artikel'}
        </button>
      </header>

      {error && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <main className="flex flex-col gap-6 max-w-4xl mx-auto">
        {articles.length === 0 ? (
          <div className="text-center text-gray-400 py-20 text-lg">
            Inga artiklar väntar på godkännande.
          </div>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{article.title}</h2>
                  <span className="text-xs text-gray-400">
                    {new Date(article.createdAt).toLocaleDateString('sv-SE')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    article.factCheckScore >= 80 ? 'bg-green-100 text-green-700' :
                    article.factCheckScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {article.factCheckScore}% Faktatillförlitlighet
                  </span>
                  <span className="text-xs rounded-full bg-purple-50 text-purple-700 px-3 py-1 font-medium">
                    {article.subject}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 text-base mb-2">{article.summary}</p>
              <div className="mb-2">
                <span className="text-xs text-gray-500 mr-2">Källor:</span>
                {article.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 underline mr-2"
                  >
                    {src}
                  </a>
                ))}
              </div>
              <div className="flex gap-3 self-end mt-2">
                <button
                  onClick={() => handleReject(article.id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition"
                >
                  Avslå
                </button>
                <button
                  onClick={() => handleApprove(article.id)}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition"
                >
                  Godkänn
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
} 