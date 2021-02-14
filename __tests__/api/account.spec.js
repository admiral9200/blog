const app = require('../../app');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('../../models/User');
const Post = require('../../models/Post');

describe('Account Route Unit', () => {
    test('Ohne Authentifikation werden keinerlei Requests an die persönliche Schnittstelle akzeptiert', async (done) => {
        const get = await request(app).get('/api/account');
        expect(get.statusCode).toBe(401);
        done();
    });
});

describe('Account Route Integration', () => {
    var mongoServer;
    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        await mongoose.connect(await mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

        app.set('sessionMiddleware', (req, res, next) => {
            req.session = {};
            req.session.userId = "";
            next();
        });
    });

    test('Nutzerdetails können über die Schnittstelle abgefragt werden', async () => {
        await User.create({
            username: 'UserTest',
            password: 'userpassword',
            email: 'user@test.de'
        });

        const res = await request(app).get('/api/account/UserTest');
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.data.username).toBe('UserTest');
    });

    test('Eine Liste der Posts des Nutzers können über die Schnittstelle abgefragt werden', async () => {
        let user = await User.create({
            username: 'PostTest',
            password: 'postpassword',
            email: 'posttest@test.de'
        });

        let post = await Post.create({
            title: 'PostTitle',
            content: 'PostContent',
            summary: 'PostSummary',
            user: user._id
        });

        let post2 = await Post.create({
            title: 'SecondPostTitle',
            content: 'PostContent',
            summary: 'PostSummary',
            user: user._id
        });

        const res = await request(app).get('/api/account/PostTest/posts');
        expect(res.body['data'].length).toBe(2);
        expect(res.body['data'][0].title).toBe('SecondPostTitle');
    });
});