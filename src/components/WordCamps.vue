<template>
    <div class="wordcamps">
        <h2>Upcoming WordCamps</h2>

        <ul>
            <li v-for="wordcamp in wordcamps">
                <router-link :to="{name: 'wordcamp', params: {id: wordcamp.ID}}">
                    {{ wordcamp.title}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    var mapGetters = require('vuex').mapGetters;

    module.exports = {
        name: 'WordCamps',

        data: function() {
            return {};
        },

        computed: mapGetters({
            wordcamps: 'wordcamps'
        }),

        created: function() {
            this.$store.dispatch('getWordcamps');
        },
    }; 
</script>
