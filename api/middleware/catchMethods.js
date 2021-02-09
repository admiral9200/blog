module.exports = (req, res, next) => {
    let err = new Error('Method Not Allowed');
    err.status = 405
    next(err);
};