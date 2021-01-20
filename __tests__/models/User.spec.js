const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('../../models/User');

let mongoServer;

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    await mongoose.connect(await mongoServer.getUri(), {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
});

describe('User', () => {
    test('User besitzt alle erforderten Eigenschaften', () => {
        for (let property of ['username', 'password', 'email', 'registered', 'level']) {
            expect(User.schema.paths[property]).toBeDefined();
        }
    });

    test('Passwort von neuen Usern wird vor dem Speichern gehasht', async() => {
        let user = await User.create({
            username: 'PasswordTest',
            password: 'testpw',
            email: 'pwtest@test.de'
        });
        expect(user.password).not.toBe('testpw');
    });

    test('User können authentifiziert werden', async() => {
        let user = await User.create({
            username: 'AuthTest',
            password: 'authpw',
            email: 'authtest@test.de'
        });
        expect(User.authenticate("authtest@test.de", "authpw")).resolves.toHaveProperty('id', user.id)
    });

    test('User können nicht doppelt angelegt werden', async() => {
        await User.create({
            username: 'UniqueTest',
            password: 'uniquepw',
            email: 'uniquetest@test.de'
        });
        expect(User.create({
            username: 'UniqueTest',
            password: 'uniquepw2',
            email: 'uniquetest@test.de'
        })).rejects.toBeDefined();
    })
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});