const app = require('../../app');
const request = require('supertest');

describe('Logout Route Unit', () => {
    test('Sitzungsdaten werden nach Aufruf gelöscht.', async() => {
        const get = await request(app).get('/api/logout');
        expect(get.headers['set-cookie'].length).toBe(2); // Signatur und tatsächlicher Sitzungs-Cookie
        expect(get.statusCode).toBe(200);
    })
})