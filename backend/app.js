require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errors, celebrate, Joi } = require('celebrate');
const usersRouter = require('./routes/users');
const newsCardRouter = require('./routes/newsCard');
const auth = require('./middleware/auth');
const { createUser, login } = require('./controllers/users');
const { getSearchNews } = require('./controllers/newsCard');
const { requestLogger, errorLogger } = require('./middleware/logger');
const NotFoundError = require('./errors/NotFaundError');

const { PORT = 3000 } = process.env;
const connectDatabase = require('./data/database');
const allowedOrigins = require('./middleware/allowedCors');

const app = express();
connectDatabase();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(requestLogger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({ origin: allowedOrigins }));

app.post(
  '/signin',
  celebrate({
    headers: Joi.object()
      .keys({
        accept: Joi.string().valid('application/json').required(),
        'content-type': Joi.string().valid('application/json').required(),
      })
      .unknown(true),
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    headers: Joi.object()
      .keys({
        accept: Joi.string().valid('application/json').required(),
        'content-type': Joi.string().valid('application/json').required(),
      })
      .unknown(true),
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(3),
    }),
  }),
  createUser,
);

app.get('/news/search', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(true),
  query: Joi.object().keys({
    keyword: Joi.string().required(),
  }),
}), getSearchNews);

app.use(auth);
app.use('/', usersRouter);
app.use('/', newsCardRouter);

app.use('/', (req, res, next) => {
  const notFoundError = new NotFoundError('Request was not found');
  return next(notFoundError);
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'A server error occurred' : message,
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`App executado na porta ${PORT}`);
  });
}

module.exports = app;
