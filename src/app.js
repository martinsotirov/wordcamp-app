var Vue         = require('vue'),
    VueResource = require('vue-resource'),
    App         = require('./components/App.vue');

Vue.use(VueResource);

Vue.config.devtools = true;

// boot app
window.vue = new Vue({

    el: '#app',

    render: function(createEl) {
        return createEl(App);
    }
});

