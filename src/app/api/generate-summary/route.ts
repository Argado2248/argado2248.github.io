import { NextRequest, NextResponse } from "next/server";
import { getChatGPTResponse } from "@/lib/openai";

export async function POST(req: NextRequest) {
  const { articleContent } = await req.json();
  const prompt = `Summarize and fact-check the following article:\n\n${articleContent}`;
  const summary = await getChatGPTResponse(prompt);
  return NextResponse.json({ summary });
}