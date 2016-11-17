<template>
    <div id="app">
        <p>Hai there 3</p>
        <p>{{ wordcamps.length }}</p>
        <ul>
            <li v-for="wordcamp in wordcamps">{{ wordcamp.title}}</li>
        </ul>
    </div>
</template>

<style>
</style>

<script>
    module.exports = {
        name: 'App',

        data: function() {
            return {
                wordcamps: []
            };
        },

        created: function() {
            this.$http.get('https://central.wordcamp.org/wp-json/posts', {
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

                console.log('----- RESPONSE -----' + '\n');
                console.log(wordcamps);
                console.log('----- END RESPONSE -----' + '\n');
            })
            .catch(function(error) {
                console.log('----- ERROR -----' + '\n');
                console.log(error);
                console.log('----- END ERROR -----' + '\n');
            });
        },

        components: {
        }
    };
</script>
