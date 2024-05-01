const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validateUrl = require('../utils/validateURL');

const { listNews, createNewsCard, deleteNews } = require('../controllers/newsCard');

router.get('/news', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(true),
}), listNews);

router.post('/news', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().required(),
  }).unknown(true),
  body: Joi.object().keys({
    fonte: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    url: Joi.string().required().custom(validateUrl),
    urlToImage: Joi.string().required().custom(validateUrl),
    publishedAt: Joi.string().required(),
    keyword: Joi.string().required(),
  }),
}), createNewsCard);

router.delete('/news/:id', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().required(),
  }).unknown(true),
}), deleteNews);

module.exports = router;
