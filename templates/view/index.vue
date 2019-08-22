<template>
    <div class="">
    </div>
</template>

<script>
/**
 * @file index
 * @author who
 */
import {mapGetters, mapState, mapActions} from 'vuex';

export default {
    name: '',
    data() {
        return {
        };
    },
    components: {
    },
    computed: {
    },
    watch: {
    },
    methods: {
        ...mapActions('', ['enter', 'leave'])
    },
    beforeCreate() {
        this.$store.registerModule('', require('./store').default);
    },
    created() {
        this.enter().then(() => {});
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeDestroy() {
    },
    destroyed() {
        this.leave();
        this.$store.unregisterModule('facefate');
    }
};
</script>

<style lang="less">

</style>
