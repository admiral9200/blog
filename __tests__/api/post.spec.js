const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('../../models/User');
const Post = require('../../models/Post');

describe('Post Route Integration Test', () => {
    var mongoServer;
    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        await mongoose.connect(await mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    });

    test('Erstellte Posts können abgerufen werden', async () => {
        const app = require('../../app');
        let post = await Post.create({
            title: 'PostTitle',
            content: 'PostContent',
            summary: 'PostSummary',
        });

        let res = await request(app).get(`/api/post/${post._id}`);
        expect(res.body['success']).toBe(true);
        expect(res.body['data'].title).toBe('PostTitle');
    });

    test('Posts können nur von angemeldeten Benutzern erstellt werden', async () => {
        const app = require('../../app');
        let res = await request(app).post('/api/post').send({
            title: 'Post',
            content: 'PostContent',
            summary: 'Summary',
            imageurl: ''
        });

        expect(res.statusCode).toBe(401);
    });

    test('Bei fehlenden Daten kann ein Post nicht erstellt werden', async () => {
        const app2 = require('../../app');
        let user = await User.create({
            username: 'MissingTest',
            password: 'userpassword',
            email: 'missing@test.de'
        });
        app2.set('sessionMiddleware', (req, res, next) => {
            req.session = {};
            req.session.userId = user._id;
            next();
        });
        const get = await request(app2).post('/api/post').send({
            title: "Test"
        });
        expect(get.statusCode).not.toBe(200);
        expect(get.body['errors'].length).toBeGreaterThan(0);
    });

    test('Posts können von angemeldeten Benutzern erstellt werden', async () => {
        const app2 = require('../../app');
        let user = await User.create({
            username: 'UserTest',
            password: 'userpassword',
            email: 'user@test.de'
        });
        app2.set('sessionMiddleware', (req, res, next) => {
            req.session = {};
            req.session.userId = user._id;
            next();
        });
        let res = await request(app2).post('/api/post').send({
            title: 'SignedInPost',
            content: 'PostContent',
            summary: 'Summary',
            imageurl: ''
        });
        expect(res.body['success']).toBe(true);
    });

    test('Posts können von ihren Erstellern wieder gelöscht werden', async (done) => {
        const app2 = require('../../app');
        let user = await User.create({
            username: 'DeleteUserTest',
            password: 'userpassword',
            email: 'deleteuser@test.de'
        });
        let post = await Post.create({
            title: 'DeletePostTitle',
            content: 'PostContent',
            summary: 'PostSummary',
            user: user._id
        });
        app2.set('sessionMiddleware', (req, res, next) => {
            req.session = {};
            req.session.userId = user._id;
            next();
        });
        let res = await request(app2).get(`/api/post/${post._id}`);
        expect(res.statusCode).toBe(200);
        let deleteRes = await request(app2).delete(`/api/post/${post._id}`);
        expect(deleteRes.statusCode).toBe(200);
        let deleteCheck = await request(app2).get(`/api/post/${post._id}`);
        expect(deleteCheck.statusCode).not.toBe(200);
        done();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });
});