const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    if(req.headers['authorization']) {
        try {
            let [type, token] = req.headers['authorization'].split(' ');
            if(type !== 'Bearer') {
                return res.status(401).json({
                    message: 'Unauthorized'
                })
            }

            req.jwt = jwt.verify(token, process.env.JWT_SECRET);
            return next();
        } catch (error) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
};