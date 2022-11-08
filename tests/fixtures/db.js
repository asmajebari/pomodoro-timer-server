const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user.model')
const Task = require('../../src/models/task.model')

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    username: 'testUser',
    email: 'testuser@example.com',
    password: 'TesT1_user',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.SECRET)
    }],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    username: 'anotherTestUser',
    email: 'testuser2@example.com',
    password: 'TesT2_user',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.SECRET)
    }],
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    name: 'task one',
    estimated: 2,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    name: 'task two',
    estimated: 5,
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    name: 'task three',
    estimated: 3,
    owner: userTwoId
}

const setupDB = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save(); 
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    userOneId,
    userOne,
    userTwo,
    taskOne,
    setupDB
}