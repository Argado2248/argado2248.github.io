import prisma from './prisma'

type ArticleCreateInput = {
  title: string
  summary: string
  content: string
  verdict: string
  sources: string[]
  status: string
}

export async function getArticles() {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  return prisma.article.findMany({
    where: {
      status: 'approved',
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
      status: 'pending'
    }
  })
}

export async function updateArticleStatus(id: string, status: 'approved' | 'rejected') {
  return prisma.article.update({
    where: { id },
    data: { status }
  })
}

export async function getPendingArticles() {
  return prisma.article.findMany({
    where: {
      status: 'pending'
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
} 