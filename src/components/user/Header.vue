<template>
    <header>
        <div>
            <div>
                <div style="display: inline-block; float: left">
                    <template><i class="el-icon-date" style="color:#be4444"/><span style="color: #333333">{{newTime}}</span></template>
                </div>
                <div style="display: inline-block; margin-left: -100px">
                    <h1>广州市不动产网上预约中心</h1>
                </div>
                <div style="display: inline-block; float: right;">
                    <div style="display: inline-block; float: right" v-if="token==null">
                        <el-button type="text" @click="goToLogin">登录</el-button>
                    </div>
                </div>
            </div>
            <div style="text-align: center">
                <el-menu :default-active="this.$route.path" background-color="#99CCFF" text-color="white" active-text-color="yellow"
                         default-active="0" mode="horizontal" class="el-menu-headLine"
                        @select="handleSelect" router style="flex: 1">
                    <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
                        <template slot="title">
                            <span>{{item.navItem}}</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    data(){
        return {
            token:localStorage.getItem('token'),
            newTime: "",
            navList:[
                {name:'/Home/Main',navItem:'网站首页'},
                {name:'/Home/Reserve',navItem:'不动产预约'},
                {name:'/Home/Guide',navItem:'窗口指引'},
                {name:'/Home/Notice',navItem:'公示公告'},
                {name:'/Home/Query',navItem:'预约查询'},
                {name:'/AdministratorLogin',navItem:'后台管理'}
            ]
        }
    },
    methods:{
        getCurrentTime() {
            var date = new Date();
            var time = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            this.newTime = time;
        },
        goToLogin() {
            this.$router.push('/UserLogin');
        },
        handleSelect(key, keypath){

        },
    },
    mounted() {
        this.getCurrentTime();
        clearTimeout(myTimeDisplay);
        let myTimeDisplay = setInterval(() => {
            this.getCurrentTime();
        }, 1000);
    },
}
</script>

<style scoped>

</style>
