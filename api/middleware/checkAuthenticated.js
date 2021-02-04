module.exports = (req, res, next) => {
    if (req.session && req.session.userId)
        return next();
    req.session = null;
    var err = new Error("Not logged in!");
    err.status = 401;
    return next(err);
}