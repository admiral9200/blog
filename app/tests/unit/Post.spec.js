import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Post from "@/components/Post";
import flushPromises from 'flush-promises';

function getSamplePost() {
    return {
        title: 'Test Title',
        content: '# Lorem Ipsum\n' +
            '## Subtitle\n' +
            '**some italic content**\n',
        user: {
            username: 'Username'
        },
        created: new Date()
    }
}

describe('Post.vue', () => {
    test('Das Datum eines Posts wird in ein lesbares Format konvertiert', () => {
        let samplePost = getSamplePost();
        const wrapper = mount(Post, {
            propsData: {
                post: samplePost
            }
        });

        let date = wrapper.findComponent({ ref: 'date' });
        expect(date.text()).toContain(samplePost.created.toLocaleDateString('de-DE'));
    });

    test('Der Inhalt eines Posts wird von Markdown zu HTML konvertiert', () => {
        let samplePost = getSamplePost();
        const wrapper = mount(Post, {
            propsData: {
                post: samplePost
            }
        });

        let content = wrapper.findComponent({ ref: 'content' });
        let lorem = content.find('h1');
        expect(lorem.exists()).toBe(true);
        expect(lorem.text()).toBe('Lorem Ipsum');
    });
});