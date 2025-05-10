import prisma from './prisma'

type ArticleCreateInput = {
  title: string
  summary: string
  content: string
  verdict: string
  sources: string[]
  status: string
  subject: string
  factCheckScore: number
}

export async function getArticles() {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  return prisma.article.findMany({
    where: {
      status: 'APPROVED',
      createdAt: {
        gte: oneDayAgo
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getArticleById(id: string) {
  return prisma.article.findUnique({
    where: { id }
  })
}

export async function createArticle(data: ArticleCreateInput) {
  return prisma.article.create({
    data: {
      ...data,
      status: 'PENDING'
    }
  })
}

export async function updateArticleStatus(id: string, status: 'APPROVED' | 'REJECTED') {
  return prisma.article.update({
    where: { id },
    data: { status }
  })
}

export async function getPendingArticles() {
  return prisma.article.findMany({
    where: {
      status: 'PENDING'
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
} 