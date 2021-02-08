import { mount } from '@vue/test-utils'
import Notification from '@/components/Notification.vue'
import flushPromises from 'flush-promises';

describe('Notification.vue', () => {
    it('Beim übergeben einer Nachricht wird diese Korrekt ausgegeben', () => {
        const msg = 'Test Nachricht'
        const wrapper = mount(Notification, {
            slots: {
                default: msg
            }
        })
        expect(wrapper.text()).toMatch(msg)
    });

    it('Notification besitzt ein type-prop der je nach Typ die Benachrichtigung farbig hinterlegt ausgibt', async () => {
        const wrapper = mount(Notification, {
            propsData: {
                type: 'error'
            },
            slots: {
                default: 'Message'
            }
        })
        expect(wrapper.classes()).toContain('error');
        wrapper.setProps({ type: 'success' });
        await flushPromises();
        expect(wrapper.classes()).toContain('success');
    });
})
