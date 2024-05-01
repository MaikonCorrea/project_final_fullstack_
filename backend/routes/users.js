const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { listUsers, userMe } = require('../controllers/users');

router.get('/users', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().required(),
  }).unknown(),
}), listUsers);

router.get('/users/me', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
    authorization: Joi.string().required(),
  }).unknown(),
}), userMe);

module.exports = router;
