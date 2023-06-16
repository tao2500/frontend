<template>
    <div class="home">
        <el-container style="height: 100%">
            <el-header><Header/></el-header>
            <el-main><router-view></router-view></el-main>
            <el-footer><Footer/></el-footer>
        </el-container>
    </div>
</template>

<script>
import Header from "@/components/user/Header.vue";
import Footer from "@/components/user/Footer.vue";
import Main from "@/components/user/Main.vue";

export default {
    name: "home",
    components:{Header,Footer,Main},
}
</script>

<style scoped>
.el-header{
    background-color: white;
    padding: 0;
    color: #333;
    text-align: center;
    line-height: 30px;
}
.el-footer {
    background-color:#99CCFF;
    color: #333;
    text-align: center;
    line-height: 60px;
}
.el-main {
    margin-top: 40px;
}

.home{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height:100%;
}

body > .el-container {
    margin-bottom: 40px;
}


</style>
