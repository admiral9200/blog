const server = require('../server');

describe('Server', () => {
    test('prüft ob der Port dem Port aus der .env-Datei übereinstimmt', async() => {
        expect(server.port).to.equal(process.env.PORT || 8080);
    });
});