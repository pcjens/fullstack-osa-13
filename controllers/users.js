const express = require('express');
const { User } = require('../models');

const router = express.Router();

const userFinder = async (req, res, next) => {
    try {
        const { username } = req.params;
        req.user = await User.findOne({ where: { username } });
        next();
    } catch (error) {
        next(error);
    }
};

router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.put('/:username', userFinder, async (req, res, next) => {
    try {
        req.user.name = req.body.name;
        await req.user.save();
        res.json(req.user);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
