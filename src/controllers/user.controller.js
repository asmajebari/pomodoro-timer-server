const User = require('../models/user.model');

async function httpAddUser(req, res) {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send({
            message: 'This email already exists'
        });
    }
} 

async function httpLogin (req, res) {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });

    } catch (e) {
        res.status(400).send({
            message: 'Unable to login'
         });
    }
}



async function httpGetUser (req, res) {
    res.send(req.user);
}

async function httpLogout(req, res) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send(); 
    } catch (e) {
        res.status(500).send();
    }
}


async function httpUpdateUser(req, res) {

    const update = req.body;
    const updates = Object.keys(update);
    const allowedUpdates = ["username", "password"];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send({error:'Invalid updates'})
    }
    try {

        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });

        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
}

async function httpDeleteUser (req, res) {
    
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
}

module.exports = {
    httpAddUser,
    httpDeleteUser,
    httpUpdateUser,
    httpGetUser,
    httpLogin,
    httpLogout
}