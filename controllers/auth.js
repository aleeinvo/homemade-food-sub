const User = require('../models').User;

module.exports = {
    async register(req, res, next) {
        try {
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            return res.json({
                data: user
            })
        } catch (error) {
            next(error);
        }
    }
};