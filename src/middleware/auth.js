const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();
const SECRET = process.env.SECRET;
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token':token });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({error:"Please authenticate!"}); //not authenticated
   }
};

module.exports = auth;