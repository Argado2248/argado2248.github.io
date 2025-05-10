import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.update({
      where: { id: params.id },
      data: { status: 'APPROVED' },
    });

    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error('Error approving article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to approve article' },
      { status: 500 }
    );
  }
} 