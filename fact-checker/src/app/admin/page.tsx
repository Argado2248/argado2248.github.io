"use client";

import React, { useState } from "react";

const mockAdminArticles = [
  {
    id: 1,
    title: "Nya riktlinjer för elbilar i Sverige",
    summary: "Regeringen har presenterat nya riktlinjer för elbilar som påverkar både konsumenter och tillverkare.",
    sources: [
      "https://svt.se/nyheter/inrikes/elbilar-2024",
      "https://dn.se/ekonomi/elbilsriktlinjer"
    ],
    date: "2024-06-10",
    status: "AI-granskad, väntar på mänsklig godkännande"
  },
  {
    id: 2,
    title: "Rykte: Skolorna kan öppna tidigare efter sommaren",
    summary: "Ett rykte sprids om att skolorna kan komma att öppna redan i början av augusti.",
    sources: [
      "https://expressen.se/nyheter/skolstart-rykte",
      "https://skolverket.se/nyheter/skolstart"
    ],
    date: "2024-06-09",
    status: "AI-granskad, väntar på mänsklig godkännande"
  },
  {
    id: 3,
    title: "Ny forskning: Svenskarna äter mer vegetariskt",
    summary: "En ny undersökning visar att svenskarnas intresse för vegetarisk mat har ökat markant under de senaste åren.",
    sources: [
      "https://livsmedelsverket.se/nyheter/vegetariskt",
      "https://aftonbladet.se/mat/vegetarisktrend"
    ],
    date: "2024-06-08",
    status: "AI-granskad, väntar på mänsklig godkännande"
  }
];

export default function AdminPage() {
  const [articles, setArticles] = useState(mockAdminArticles);

  const handleApprove = (id: number) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const handleReject = (id: number) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 py-8">
      <header className="mb-8 flex items-center justify-between max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight">Adminpanel: Artiklar för godkännande</h1>
      </header>
      <main className="flex flex-col gap-6 max-w-4xl mx-auto">
        {articles.length === 0 ? (
          <div className="text-center text-gray-400 py-20 text-lg">Inga artiklar väntar på godkännande.</div>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{article.title}</h2>
                  <span className="text-xs text-gray-400">{article.date}</span>
                </div>
                <span className="text-xs rounded-full bg-purple-50 text-purple-700 px-3 py-1 font-medium w-fit">{article.status}</span>
              </div>
              <p className="text-gray-700 text-base mb-2">{article.summary}</p>
              <div className="mb-2">
                <span className="text-xs text-gray-500 mr-2">Källor:</span>
                {article.sources.map((src, i) => (
                  <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline mr-2">{src}</a>
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