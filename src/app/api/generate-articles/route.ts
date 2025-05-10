import { NextRequest, NextResponse } from "next/server";
import { getLatestRssArticles } from "@/lib/rss";
import { generateFactCheck } from "@/lib/openai";
import prisma from "@/lib/prisma";

// Function to determine the subject based on article content
function determineSubject(title: string, content: string): string {
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();

  // Define keywords for each category
  const categoryKeywords = {
    'Politik': ['riksdag', 'regering', 'minister', 'parti', 'val', 'politik', 'politiker'],
    'Ekonomi': ['ekonomi', 'börs', 'aktie', 'bank', 'finans', 'peng', 'krön', 'inflation'],
    'Miljö': ['miljö', 'klimat', 'väder', 'natur', 'miljöförstöring', 'utsläpp'],
    'Gäng': ['gäng', 'kriminell', 'brott', 'skjutning', 'våld', 'narkotika'],
    'Samhälle': ['samhälle', 'välfärd', 'skola', 'sjukvård', 'transport', 'infrastruktur'],
    'Kultur': ['kultur', 'film', 'musik', 'teater', 'konst', 'underhållning'],
    'Sport': ['sport', 'fotboll', 'hockey', 'idrott', 'match', 'turnering'],
    'Teknik': ['teknik', 'digital', 'app', 'mobil', 'dator', 'internet', 'ai'],
    'Vetenskap': ['vetenskap', 'forskning', 'studie', 'universitet', 'laboratorium'],
    'Hälsa': ['hälsa', 'sjukdom', 'medicin', 'vård', 'vaccin', 'covid']
  };

  // Count keyword matches for each category
  const categoryScores = Object.entries(categoryKeywords).map(([category, keywords]) => {
    const score = keywords.reduce((count, keyword) => {
      const titleMatches = (lowerTitle.match(new RegExp(keyword, 'g')) || []).length;
      const contentMatches = (lowerContent.match(new RegExp(keyword, 'g')) || []).length;
      return count + titleMatches * 2 + contentMatches; // Weight title matches more heavily
    }, 0);
    return { category, score };
  });

  // Sort by score and return the highest scoring category
  categoryScores.sort((a, b) => b.score - a.score);
  return categoryScores[0].score > 0 ? categoryScores[0].category : 'Senaste nytt';
}

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // Fetch latest RSS articles
    const articles = await getLatestRssArticles();
    
    if (!articles || articles.length === 0) {
      return NextResponse.json({ 
        success: false,
        error: 'No articles found in RSS feeds'
      }, { status: 404 });
    }

    const results = [];
    for (const article of articles.slice(0, 5)) { // Process only the 5 most recent articles
      try {
        // Generate fact check
        const factCheck = await generateFactCheck({
          title: article.title,
          content: article.content,
          url: article.link
        });

        // Determine the subject based on content
        const subject = determineSubject(article.title, article.content);

        // Save to DB
        const created = await prisma.article.create({
          data: {
            title: article.title,
            summary: factCheck.summary,
            content: factCheck.factCheckedContent,
            verdict: factCheck.verdict,
            subject: subject,
            sources: [article.link, ...factCheck.sources],
            status: "PENDING", // Changed to PENDING for admin review
            factCheckScore: factCheck.factCheckScore,
          },
        });

        results.push(created);
      } catch (error) {
        console.error(`Error processing article ${article.title}:`, error);
        continue;
      }
    }

    return NextResponse.json({ 
      success: true,
      created: results.length,
      articles: results 
    });
  } catch (error) {
    console.error('Error in generate-articles:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to generate articles'
    }, { status: 500 });
  }
} 