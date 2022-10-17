const express = require('express');
const passport = require ('passport');
const helmet = require('helmet');
const path = require("path");
const cors = require('cors');
require('./db/mongoose');
const api = require('./routers/api');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
}));


app.use(helmet());
app.use(express.json()); 
app.use(passport.initialize());
require('./services/googleStrategy');
app.use('', api);

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});

