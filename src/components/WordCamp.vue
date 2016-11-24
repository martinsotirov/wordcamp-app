<template>
    <div class="content wordcamp-page">

        <header>
            <router-link to="/wordcamps" class="back-btn">Back</router-link>
            <h2 v-if="wordcamp" class="screen-title">{{ wordcamp.title }}</h2>
        </header>

        <div class="wordcamp" v-if="wordcamp">
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
