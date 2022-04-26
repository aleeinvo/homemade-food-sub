const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    },
    async login(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password) {
            return res.status(422).json({
                message: 'Email and Password are required.'
            });
        }

        try {
            const user = await User.findOne({
                where: {
                    email
                }
            });

            if(!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            const match = await bcrypt.compare(password, user.password);

            if(!match) {
                return res.status(422).json({
                    message: 'Your credentials are not correct'
                })
            }

            const token = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }, process.env.JWT_SECRET);

            return res.status(200).json({
                message: 'You have logged in successfully',
                data: {
                    token,
                    user
                }
            })
        } catch (error) {
            next(error);
        }
    }
};