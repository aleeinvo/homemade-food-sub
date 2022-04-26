const User = require('../models').User;

module.exports = {
    async index(req, res) {
        const users = await User.findAll();

        return res.json({
            data: users
        });
    },
    async store(req, res) {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        return res.json({
            data: user
        })
    }
};