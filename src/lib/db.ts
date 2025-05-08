import prisma from './prisma.js'

type ArticleCreateInput = {
  title: string
  summary: string
  content: string
  verdict: string
  sources: string[]
  status: string
}

export async function getArticles() {
  return prisma.article.findMany({
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