var Vue         = require('vue'),
    VueResource = require('vue-resource'),
    VueRouter   = require('vue-router'),
    Vuex        = require('vuex'),
    App         = require('./components/App.vue'),
    WordCamps   = require('./components/WordCamps.vue'),
    WordCamp    = require('./components/WordCamp.vue');

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);

Vue.config.devtools = true;

var store = new Vuex.Store({
    state: {
        isWeb: false,
        wordcamps: [],
        selectedWordcamp: null
    },

    getters: {
        isWeb: function(state) {
            return state.isWeb;
        },

        wordcamps: function(state) {
            return state.wordcamps;
        },

        apiEndpoint: function(state) {
            var api = state.isWeb
                ? '/wordcamps.json'
                : 'https://central.wordcamp.org/wp-json/posts';
            return api;
        },

        selectedWordcamp: function(state) {
            return state.selectedWordcamp;
        }
    },

    mutations: {
        setIsWeb: function(state, isWeb) {
            state.isWeb = isWeb;
        },

        setWordcamps: function(state, wordcamps) {
            state.wordcamps = wordcamps;
        },

        setSelectedCamp: function(state, wordcamp) {
            state.selectedWordcamp = wordcamp;
        }
    },

    actions: {
        getWordcamps: function(store) {
            return new Promise(function(resolve, reject) {
                Vue.http.get(store.getters.apiEndpoint, {
                    params: {
                        'type': 'wordcamp',
                        'filter[posts_per_page]': '50',
                    }
                })
                .then(function(response) {
                    var wordcamps = response.body.filter(function(el) {
                        return el.status === 'wcpt-scheduled';
                    });

                    store.commit('setWordcamps', wordcamps);
                    resolve(wordcamps);
                })
                .catch(function(error) {
                    console.log(error);
                    reject(error);
                });
            });
        },

        fetchWordcamp: function(store, id) {
            store.dispatch('getWordcamps').then(function(data) {
                var selectedWordcamp = data.find(function(el) {
                    return el.ID == id && el.status === 'wcpt-scheduled';
                });
                store.commit('setSelectedCamp', selectedWordcamp);
            });
        }
    }
});

var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/wordcamps' },
        { path: '/wordcamps', component: WordCamps },
        { path: '/wordcamps/:id', component: WordCamp, name: 'wordcamp' },
    ]
});

// boot app
window.vue = new Vue({

    el: '#app',

    router: router,

    store: store,

    render: function(createEl) {
        return createEl(App);
    }
});

