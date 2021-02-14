const app = require('../../app');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('../../models/User');

describe('Register Route Unit', () => {
    test('Ausschließlich POST Requests werden akzeptiert', async (done) => {
        const get = await request(app).get('/api/register');
        const post = await request(app).post('/api/register');
        expect(get.statusCode).toBe(405);
        expect(post.statusCode).not.toBe(405);
        done();
    });

    test('Bei fehlerhaften Daten kann ein Nutzer nicht registriert werden', async (done) => {
        const get = await request(app).post('/api/register').send({
            username: 'Bernd', password: 'testpassw', confirmPassword: 'anderespw', email: 'keineEmail'
        });
        expect(get.statusCode).not.toBe(200);
        expect(get.body['errors'].length).toBe(2);
        done();
    });
});

describe('Register Route Integration', () => {
    var mongoServer;
    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        await mongoose.connect(await mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    });

    test('Nutzer werden registriert', async (done) => {
        const get = await request(app).post('/api/register').send(
            { username: 'Bernd', password: 'testpassw', confirmPassword: 'testpassw', email: 'test@test.de' }
        );
        expect(get.statusCode).toBe(200);
        expect(get.body).toHaveProperty('success', true)
        done();
    });

    test('Es können nicht zwei gleiche Nutzernamen registriert werden', async (done) => {
        await request(app).post('/api/register').send(
            { username: 'Bernd', password: 'testpassw', confirmPassword: 'testpassw', email: 'test@test.de' }
        );
        const result = await request(app).post('/api/register').send(
            { username: 'Bernd', password: 'testpassw', confirmPassword: 'testpassw', email: 'test2@test.de' }
        );
        expect(result.statusCode).not.toBe(200);
        expect(result.body).toHaveProperty('success', false)
        done();
    });

    test('Es können nicht zwei gleiche E-Mail Adressen registriert werden', async (done) => {
        await request(app).post('/api/register').send(
            { username: 'Björn', password: 'testpassw', confirmPassword: 'testpassw', email: 'test4@test.de' }
        );
        const result = await request(app).post('/api/register').send(
            { username: 'Hans', password: 'testpassw', confirmPassword: 'testpassw', email: 'test4@test.de' }
        );
        expect(result.statusCode).not.toBe(200);
        expect(result.body).toHaveProperty('success', false)
        done();
    });

    test('Nach erfolgreicher Registrierung wird der Nutzer über einen Cookie angemeldet', async (done) => {
        const result = await request(app).post('/api/register').send(
            { username: 'Keks', password: 'testpassw', confirmPassword: 'testpassw', email: 'kruemel@test.de' }
        );
        expect(result.headers['set-cookie'].length).toBe(2); // Signatur und tatsächlicher Sitzungs-Cookie
        expect(result.headers['set-cookie'].every(str => str.endsWith('httponly'))).toBeTruthy();
        done();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });
});