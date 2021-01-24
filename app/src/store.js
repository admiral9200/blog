const store = {
    debug: true,
    state: {
        loggedIn: false
    },
    setLoggedIn(newValue) {
        if (this.debug) console.log('setLoggedIn triggered with', newValue);
        window.localStorage.setItem('loggedIn', JSON.stringify(newValue));
        this.state.loggedIn = newValue;
    },
    clearLoggedIn() {
        if (this.debug) console.log('clearLoggedIn triggered')
        window.localStorage.removeItem('loggedIn');
        this.state.loggedIn = null;
    }
}

store.setLoggedIn(JSON.parse(window.localStorage.getItem('loggedIn')) || null);

export default store;