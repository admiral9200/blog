const store = {
    debug: true,
    state: {
        uid: null,
    },
    setUID(newValue) {
        if (this.debug) console.log('setUID triggered with', newValue);
        window.localStorage.setItem('uid', newValue);
        this.state.uid = newValue;
    },
    clearUID() {
        if (this.debug) console.log('clearUID triggered')
        window.localStorage.removeItem('uid');
        this.state.uid = null;
    }
}

store.setUID(window.localStorage.getItem('uid') || null);

export default store;