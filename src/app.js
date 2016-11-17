var Vue         = require('vue'),
    VueResource = require('vue-resource'),
    VueRouter   = require('vue-router'),
    App         = require('./components/App.vue'),
    WordCamps   = require('./components/WordCamps.vue'),
    WordCamp    = require('./components/WordCamp.vue');

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.config.devtools = true;

var router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/wordcamps' },
        { path: '/wordcamps', component: WordCamps },
        { path: '/wordcamps/:id', component: WordCamp },
    ]
});

// boot app
window.vue = new Vue({

    el: '#app',

    router: router,

    render: function(createEl) {
        return createEl(App);
    }
});

