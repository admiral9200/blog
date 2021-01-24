const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        mongoose.connection.db.dropCollection('User')
            .then(() => {
                console.log("Database Initialization successful!")
                process.exit(0);
            })
            .catch((err) => {
                console.error(err);
                process.exit(0);
            })
    })
    .catch(err => {
        console.log("Database Initialization failed! :(")
        console.error(err);
        process.exit(1);
    });