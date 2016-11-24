<template>
    <div class="content wordcamps-page">
        <header>
            <h2 class="screen-title">Upcoming WordCamps</h2>
        </header>

        <ul class="wordcamps">
            <li v-for="wordcamp in wordcamps" class="wordcamp-preview">
                <router-link :to="{name: 'wordcamp', params: {id: wordcamp.ID}}">
                    <h3 class="wordcamp-title">{{ wordcamp.title}}</h3>
                    <div class="dates">{{ getDates(wordcamp)}}</div>
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

        methods: {
            getDates: function(wordcamp) {
                var dates = '',
                    startDate,
                    endDate,
                    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                wordcamp.post_meta.forEach(function(meta) {
                    if (meta.key.indexOf('Start Date') === 0) {
                        startDate = new Date(parseInt(meta.value) * 1000);
                    } else if (meta.key.indexOf('End Date') === 0) {
                        endDate = new Date(parseInt(meta.value) * 1000);
                    }
                });

                if (typeof startDate === 'object' && !isNaN(startDate.getDate())) {
                    dates += startDate.getDate() + ' ' + months[startDate.getMonth()] + ' ' + startDate.getFullYear();
                }
                if (typeof endDate === 'object' && !isNaN(endDate.getDate())
                    && startDate.getDate() !== endDate.getDate()) {

                    dates += ' – ' + endDate.getDate() + ' ' + months[endDate.getMonth()] + ' ' + endDate.getFullYear();
                }
                return dates;
            }
        },

        created: function() {
            this.$store.dispatch('getWordcamps');
        },
    }; 
</script>
