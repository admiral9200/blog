const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Post = require('../../models/Post');

let mongoServer;

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    await mongoose.connect(await mongoServer.getUri(), {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
});

describe('Post', () => {
    test('Post besitzt alle erforderten Eigenschaften', () => {
        for (let property of ['title', 'user', 'imageurl', 'content', 'summary', 'created', 'isDraft', 'lastUpdated']) {
            expect(Post.schema.paths[property]).toBeDefined();
        }
    });

    test('Datumseigenschaften von neuen Posts werden automatisch gesetzt', async() => {
        let post = await Post.create({
            title: 'PostTitle',
            content: 'PostContent',
            summary: 'PostSummary'
        });
        expect(post.created).toBeInstanceOf(Date)
        expect(post.lastUpdated).toBeInstanceOf(Date)
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});