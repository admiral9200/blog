const app = require('../../app');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('../../models/User');

beforeAll(async () => {
    app.set('sessionMiddleware', (req, res, next) => {
        req.session = {};
        req.session.userId = "";
        next();
    });
});

describe('Account Route Unit', () => {
    test('Ohne Authentifikation werden keinerlei Requests akzeptiert', async (done) => {
        const get = await request(app).get('/api/account');
        const post = await request(app).post('/api/account');
        expect(get.statusCode).toBe(401);
        expect(post.statusCode).toBe(401);
        done();
    });
});