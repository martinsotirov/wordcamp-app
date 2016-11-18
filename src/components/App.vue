<template>
    <div id="app">
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
            };
        },

        created: function() {
            this.$store.commit('setIsWeb', location.href.indexOf('http') === 0);
        },

        components: {
        }
    };
</script>
