import prisma from './prisma.js'
import { getArticles, createArticle, updateArticleStatus, getPendingArticles } from './db.js'

async function testDatabase() {
  try {
    console.log('Testing database connection...')

    // Test creating an article
    console.log('\nCreating test article...')
    const testArticle = await createArticle({
      title: 'Test Article',
      summary: 'This is a test article',
      content: 'This is the content of the test article',
      verdict: 'Pending review',
      sources: ['https://example.com/test'],
      status: 'pending'
    })
    console.log('Created article:', testArticle)

    // Test getting all articles
    console.log('\nGetting all articles...')
    const allArticles = await getArticles()
    console.log('All articles:', allArticles)

    // Test getting pending articles
    console.log('\nGetting pending articles...')
    const pendingArticles = await getPendingArticles()
    console.log('Pending articles:', pendingArticles)

    // Test updating article status
    console.log('\nUpdating article status...')
    const updatedArticle = await updateArticleStatus(testArticle.id, 'approved')
    console.log('Updated article:', updatedArticle)

    // Clean up test data
    console.log('\nCleaning up test data...')
    await prisma.article.delete({
      where: { id: testArticle.id }
    })
    console.log('Test article deleted')

    console.log('\nAll database tests completed successfully!')
  } catch (error) {
    console.error('Database test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the test
testDatabase() 