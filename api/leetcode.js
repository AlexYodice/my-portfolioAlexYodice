const axios = require('axios');
const cheerio = require('cheerio');

export default async function handler(req, res) {
  const { username } = req.query;
  
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }
  
  try {
    // Fetch the LeetCode profile page
    const response = await axios.get(`https://leetcode.com/${username}`);
    const $ = cheerio.load(response.data);
    
    // Extract data using cheerio selectors
    // Note: These selectors might need to be updated if LeetCode changes their HTML structure
    const totalSolved = $('.total-solved-container__1WZP .total-solved-number__2El7').text();
    const easyStats = $('.difficulty-level-container__3gH7:nth-child(1)').text();
    const mediumStats = $('.difficulty-level-container__3gH7:nth-child(2)').text();
    const hardStats = $('.difficulty-level-container__3gH7:nth-child(3)').text();
    
    res.status(200).json({
      username,
      totalSolved,
      easyStats,
      mediumStats,
      hardStats
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch LeetCode stats' });
  }
} 