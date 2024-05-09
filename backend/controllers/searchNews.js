const NewsApi = require('../utils/NewsApi');

const newsApi = new NewsApi({
  baseUrl: process.env.REACT_APP_BASE_URL_API,
  token: process.env.REACT_APP_TOKEN_API,
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
