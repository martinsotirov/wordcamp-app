<template>
    <div id="app">
        <p>Hai there 3</p>
        <p>{{ window }}</p>
        <p>{{ document }}</p>
        <p>{{ wordcamps.length }}</p>
        <ul>
            <li v-for="wordcamp in wordcamps">{{ wordcamp.title}}</li>
        </ul>

        <router-view></router-view>
    </div>
</template>

<style>
</style>

<script>
    module.exports = {
        name: 'App',

        data: function() {
            return {
                wordcamps: [],
                isWeb: location.href.indexOf('http') === 0
            };
        },

        created: function() {

            var api = this.isWeb ? '/wordcamps.json' : 'https://central.wordcamp.org/wp-json/posts'

            this.$http.get(api, {
                params: {
                    'type': 'wordcamp',
                    'filter[posts_per_page]': '50',
                }
            })
            .then(function(response) {
                var wordcamps = response.body.filter(function(el) {
                    return el.status === 'wcpt-scheduled';
                });

                this.wordcamps = wordcamps;
            })
            .catch(function(error) {
                console.log(error);
            });
        },

        components: {
        }
    };
</script>
