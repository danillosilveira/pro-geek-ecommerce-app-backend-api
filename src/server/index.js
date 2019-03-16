require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const DatabaseConnection = require('./../db/connection.js');
require('../../configs/passport.js');

// Start Express
const app = express();

// Database Connection
DatabaseConnection();

// Server Init
const HTTP_SERVER = process.env.PORT;
app.listen(HTTP_SERVER, () => {
  console.log(`server listening on port ${HTTP_SERVER}!`);
});

// Session
app.use(session({
  secret: 'some secret goes here',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(cors({
  credentials: true,
  origin: ['https://pro-geek-h.surge.sh', 'https://pro-geek-j.surge.sh', 'https://pro-geek.surge.sh', 'http://localhost:3000']
}));

// Routes Response Listener
app.use(morgan('combined'));

// Body Parser Init
app.use(bodyParser.json());

// Requiring Endpoints
const users = require('../endpoints/users.js');
const products = require('../endpoints/products.js');
const orders = require('../endpoints/orders.js');
const evaluations = require('../endpoints/evaluation.js');
const categories = require('../endpoints/categories.js');
const fileUpload = require('../endpoints/fileupload.js');

app.use('/users', users);
app.use('/products', products);
app.use('/orders', orders);
app.use('/evaluations', evaluations);
app.use('/categories', categories);
app.use('/file', fileUpload);

module.exports = app;
