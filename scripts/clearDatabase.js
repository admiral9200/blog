require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, authSource: "admin"});
        await Promise.allSettled([
            User.collection.drop(),
            Post.collection.drop()]);
        console.log('Database initialization successful!');
        process.exit(0);
    } catch (e) {
        console.log('Database initialization failed!');
        console.log(e);
        process.exit(1);
    }
})();
