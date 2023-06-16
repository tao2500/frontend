<template>
<router-view></router-view>
</template>

<script>
import Login from '@/components/user/Login.vue'
import Index from "@/components/administrator/Index.vue";
import home from "@/components/user/Home.vue";


export default {
    name: 'App',
    components: {
        Index,
        Login,
        home
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
