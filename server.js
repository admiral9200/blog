const app = require('./app')

const listener = app.listen(process.env.PORT, () => {
    console.log(`Hooray! Server is running on port ${listener.address().port}.`)
});

module.exports = listener;
