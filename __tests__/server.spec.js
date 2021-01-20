const server = require('../server').server;
const request = require('supertest');

describe('Server', () => {
    test('Port des Servers stimmt mit dem Port der .env-Datei überein', () => {
        expect(server.address().port).toBe(parseInt(process.env.PORT));
    });

    test('"GET /api/" gibt HTTP Statuscode 200 zurück', async() => {
        const response = await request(server).get('/api/');
        expect(response.statusCode).toBe(200);
    });

    test('"GET /keineRoute/" gibt HTTP Statuscode 404 zurück', async() => {
        const response = await request(server).get('/keineRoute/');
        expect(response.statusCode).toBe(404);
    });

    afterAll(() => {
        server.close();
    });
});