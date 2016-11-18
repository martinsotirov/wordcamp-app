<template>
    <div class="wordcamp-page">
        <router-link to="/wordcamps">Back</router-link>

        <div class="wordcamp" v-if="wordcamp">
            <h2>{{ wordcamp.title }}</h2>
            <div class="content" v-html="wordcamp.content"></div>
            <dl v-for="meta in wordcamp.post_meta">
                <dt>{{ meta.key }}</dt>
                <dd>{{ meta.value }}</dd>
            </dl>
        </div>
    </div>
</template>

<style lang="scss">
    .wordcamp {
        dl {
            margin: 1em auto;
            display: block;
            overflow: hidden;

            dt {
                font-weight: bold;
                float: left;
                width: 50%;
                clear: both;
            }

            dd {
                margin: 0;
                float: left;
                width: 50%;
                clear: right;
            }
        }
    }
</style>

<script>
    var mapGetters = require('vuex').mapGetters;

    module.exports = {
        name: 'WordCamp',

        created: function() {
            this.getWordcamp();
        },

        methods: {
            getWordcamp: function() {
                this.$store.dispatch('fetchWordcamp', this.$route.params.id);
            }
        },

        computed: {
            wordcamp: function() {
                return this.$store.getters.selectedWordcamp;
            }
        },

        watch: {
            '$route': 'getWordcamp'
        }
    };
</script>
