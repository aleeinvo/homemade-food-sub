module.exports = (req, res, next) => {
    if(req.jwt.isAdmin) {
        return next();
    } else {
        return res.status(403).json({
            message: 'Forbidden'
        })
    }
}