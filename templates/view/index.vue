<template>
    <div class="">
    </div>
</template>

<script>
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
}
</script>

<style lang="less">

</style>
