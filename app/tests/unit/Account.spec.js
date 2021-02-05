import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Account from "@/components/Account";
import flushPromises from 'flush-promises';

import axios from 'axios';

jest.mock('axios');

axios.get.mockResolvedValue({data: {data: {username: 'Mark'}}})

describe('Account.vue', () => {
    test('Ist ein Nutzer angemeldet, so wird dieser begrüßt', async () => {
        const store = require('@/store').globalStore;
        let localVue = createLocalVue();
        localVue.prototype.$globals = store;
        localVue.prototype.$http = axios;
        const wrapper = mount(Account, {
            localVue,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
        expect(wrapper.text()).toContain('Login');
        wrapper.vm.$globals.setLoggedIn(true);
        await flushPromises();
        expect(wrapper.text()).toContain('Welcome');
    });

    test('Ist ein Nutzer angemeldet, so werden Infos vom Server angefragt und sein Name ausgegeben', async () => {
        const store = require('@/store').globalStore;
        let localVue = createLocalVue();
        localVue.prototype.$globals = store;
        localVue.prototype.$http = store;
        const wrapper = mount(Account, {
            localVue,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
        wrapper.vm.$globals.setLoggedIn(true);
        await flushPromises();
        expect(wrapper.text()).toContain('Mark');
    });

    test('Ist ein Nutzer angemeldet, so wird dieser nach Abmeldung auch tatsächlich abgemeldet', async () => {
        const store = require('@/store').globalStore;
        let localVue = createLocalVue();
        localVue.prototype.$globals = store;
        localVue.prototype.$http = axios;
        const wrapper = mount(Account, {
            localVue,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
        wrapper.vm.$globals.setLoggedIn(true);
        await flushPromises();
        expect(wrapper.text()).toContain('Welcome');
        let logoutButton = wrapper.findComponent({ref: 'logout'});
        await logoutButton.trigger('click');
        await flushPromises();
        expect(wrapper.text()).toContain('Login');
    });
});
