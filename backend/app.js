require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const usersRouter = require('./routes/users');
const newsCardRouter = require('./routes/newsCard');
const auth = require('./middleware/auth');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/NotFaundError');

const { PORT = 3001 } = process.env;
const connectDatabase = require('./data/database');

const app = express();
connectDatabase();
const allowedOrigins = require('./middleware/allowedCors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

app.use(auth);
app.use('/', usersRouter);
app.use('/', newsCardRouter);

app.use('/', (req, res, next) => {
  const notFoundError = new NotFoundError('Request was not found');
  return next(notFoundError);
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'A server error occurred' : message,
  });
});

app.listen(PORT, () => {
  console.log(`App executado na porta ${PORT}`);
});
