const express = require('express');
const passport = require ('passport');
const helmet = require('helmet');
const cors = require('cors');
require('./db/mongoose');
const api = require('./routers/api');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
}));


app.use(helmet());
app.use(express.json()); 
app.use(passport.initialize());
require('./services/googleStrategy');
app.use('', api);

module.exports = app;