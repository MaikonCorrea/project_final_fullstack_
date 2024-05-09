const NewsApi = require('../utils/NewsApi');

const newsApi = new NewsApi({
  baseUrl: 'https://newsapi.org/v2/everything?',
  token: process.env.TOKEN_API,
});

module.exports = {
  getSearchNews: async (req, res, next) => {
    const { keyword } = req.query;
    try {
      const newsData = await newsApi.getNews(keyword);
      res.json(newsData);
    } catch (error) {
      next(error);
    }
  },
};
