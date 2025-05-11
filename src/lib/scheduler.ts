// This file sets up a scheduled job to automatically generate articles from RSS feeds every hour.
import cron from 'node-cron';

// Import fetch for Node.js if not available globally
import fetch from 'node-fetch';

// This will run every hour
cron.schedule('0 * * * *', async () => {
  try {
    await fetch('http://localhost:3000/api/generate-articles', { method: 'POST' });
    console.log('Scheduled article generation triggered.');
  } catch (error) {
    console.error('Error triggering scheduled article generation:', error);
  }
}); 