const express = require('express');

const googleAuthRoutes = require('./googleAuth')
const tasksRouter = require('./task.router'); 
const userRouter = require('./user.router');

const api = express.Router();

api.use('/tasks', tasksRouter);
api.use('/users', userRouter);
api.use('/auth', googleAuthRoutes);

module.exports = api;