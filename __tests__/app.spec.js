const app = require('../app');
const request = require('supertest');

describe('App', () => {
    test('"GET /api/" gibt HTTP Statuscode 200 zurück', async(done) => {
        const response = await request(app).get('/api/');
        expect(response.statusCode).toBe(200);
        done();
    });

    test('"GET /keineRoute/" gibt HTTP Statuscode 404 zurück', async(done) => {
        const response = await request(app).get('/keineRoute/');
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('success', false);
        done();
    });
});