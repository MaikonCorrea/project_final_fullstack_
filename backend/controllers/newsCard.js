const NewsAPI = require('newsapi');

const NewsCard = require('../models/newsCard');

const newsApiClient = new NewsAPI(process.env.NEWS_API_KEY);
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFaundError');

module.exports = {
  createNewsCard: async (req, res, next) => {
    const {
      fonte,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      keyword,
    } = req.body;
    const linkRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/;
    const isValidLink = url.match(linkRegex);
    if (!isValidLink) {
      const validationError = new ValidationError('ink entered is not valid');
      return next(validationError);
    }
    const owner = req.user._id;
    const newNews = new NewsCard({
      fonte,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      owner,
      keyword,
      createdAt: new Date(),
    });
    try {
      const savedNews = await newNews.save();
      const news = await NewsCard.find();
      news.unshift(savedNews);
      res.status(201).json(savedNews);
    } catch (err) {
      next(err);
    }
  },

  listNews: async (req, res, next) => {
    try {
      const userId = req.user._id;
      const news = await NewsCard.find({ owner: userId }).sort({
        createdAt: -1,
      });
      return res.status(200).json(news);
    } catch (error) {
      next(error);
    }
  },

  deleteNews: async (req, res, next) => {
    try {
      const idUser = req.user._id;
      const idNewsDelete = req.params.id;
      const newsToDelete = await NewsCard.findOneAndDelete({
        _id: idNewsDelete,
        owner: idUser,
      });

      if (!newsToDelete) {
        const notFoundError = new NotFoundError('Card not found');
        return next(notFoundError);
      }

      return res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  getSearchNews: async (req, res, next) => {
    const { keyword } = req.query;
    if (!keyword) {
      const validationError = new ValidationError('Keyword is required');
      return next(validationError);
    }
    try {
      const response = await newsApiClient.v2.everything({
        q: keyword,
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        to: new Date().toISOString(),
        pageSize: 100,
        language: 'pt',
        sortBy: 'publishedAt',
      });
      res.send(response.articles);
    } catch (error) {
      next(error);
    }
  },

};
