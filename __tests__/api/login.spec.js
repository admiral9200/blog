const app = require('../../app');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('../../models/User');

describe('Login Route Unit', () => {
    test('Ausschließlich POST Requests werden akzeptiert', async (done) => {
        const get = await request(app).get('/api/login');
        const post = await request(app).post('/api/login');
        expect(get.statusCode).toBe(405);
        expect(post.statusCode).not.toBe(405);
        done();
    });

    test('Bei fehlerhaften Daten kann ein Nutzer nicht angemeldet werden', async (done) => {
        const get = await request(app).post('/api/login').send({
            password: 123, email: 'keineEmail'
        });
        expect(get.statusCode).not.toBe(200);
        expect(get.body['errors'].length).toBeGreaterThan(0);
        done();
    });
});

describe('Register Route Integration', () => {
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

    test('Nutzer können angemeldet werden', async (done) => {
        await User.create({
            username: 'SignTest',
            password: 'signpassword',
            email: 'signtest@test.de'
        });
        const get = await request(app).post('/api/login').send(
            { password: 'signpassword', email: 'signtest@test.de' }
        );
        expect(get.statusCode).toBe(200);
        expect(get.body).toHaveProperty('success', true)
        done();
    });

    test('Nutzer können mit falschen Anmeldedaten nicht angemeldet werden', async (done) => {
        await User.create({
            username: 'SignTest2',
            password: 'signpassword2',
            email: 'signtest2@test.de'
        });
        const get = await request(app).post('/api/login').send(
            { password: 'signpassword4', email: 'signtest2@test.de' }
        );
        expect(get.statusCode).not.toBe(200);
        expect(get.body).toHaveProperty('success', false)
        done();
    });

    test('Nach erfolgreicher Anmeldung ist der Nutzer über einen Cookie angemeldet', async (done) => {
        await User.create({
            username: 'AuthTest',
            password: 'signinpw',
            email: 'authtest@test.de'
        });
        const result = await request(app).post('/api/login').send(
            { password: 'signinpw', email: 'authtest@test.de' }
        );
        expect(result.statusCode).toBe(200);
        expect(result.headers['set-cookie'].length).toBe(2); // Signatur und tatsächlicher Sitzungs-Cookie
        expect(result.headers['set-cookie'].every(str => str.endsWith('httponly'))).toBeTruthy();
        done();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });
});