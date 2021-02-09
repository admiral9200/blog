const server = require('../server');

beforeAll(async() => {
    await { then(r, f) { server.on('listening', r); server.on('error', f); } };
});

describe('Server', () => {
    test('Port des Servers stimmt mit dem Port der .env-Datei überein', (done) => {
        expect(server.address().port).toBe(parseInt(process.env.PORT));
        done();
    });
});

afterAll(done => {
    server.close(() => setTimeout(done, 100)); // avoid dangling handle
});
