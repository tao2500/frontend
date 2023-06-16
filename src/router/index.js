import vue from 'vue'
import vueRouter from "vue-router";
import Login from "@/components/user/Login.vue";
import Index from "@/components/administrator/Index.vue";
import Home from "@/components/user/Home.vue";
import Reserve from "@/components/user/Reserve.vue";
import Guide from "@/components/user/Guide.vue";
import Notice from "@/components/user/Notice.vue";
import Query from "@/components/user/Query.vue";
import Main from "@/components/user/Main.vue";
import Register from "@/components/user/Register.vue";
import AdministratorLogin from "@/components/administrator/AdministratorLogin.vue";
import NoticeManage from "@/components/administrator/NoticeManage.vue";
import ReserveCenterManage from "@/components/administrator/ReserveCenterManage.vue";
import ReserveManage from "@/components/administrator/ReserveManage.vue";
import axios from "axios";
import ReserveCenterAdd from "@/components/administrator/ReserveCenterAdd.vue";
import UserState from "@/components/administrator/UserState.vue";
import UserInfo from "@/components/administrator/UserInfo.vue";
import Background from "@/components/administrator/Background.vue";

vue.use(vueRouter)

const router=new vueRouter({
    mode: "history",
    routes:[
        {path: '/UserLogin',component: Login},
        {path: '/UserRegister',component: Register},
        {
            path:'/Home',
            component:Home,
            children:[
                {path: 'Main',component: Main},
                {path: 'Reserve',component: Reserve},
                {path: 'Guide',component: Guide},
                {path: 'Notice',component: Notice},
                {path: 'Query',component: Query},
            ]},

        {path:'/AdministratorLogin',component: AdministratorLogin},
        {
            path: '/Index',
            component: Index,
            children:[
                {path: 'NoticeManage',component: NoticeManage},
                {path: 'ReserveCenterManage',component: ReserveCenterManage},
                {path: 'ReserveManage',component: ReserveManage},
                {path: 'UserInfo',component: UserInfo},
                {path: 'ReserveCenterAdd',component: ReserveCenterAdd},
                {path: 'UserState',component: UserState},
                {path: 'Background',component: Background}
            ]
        },

        {path:'/', redirect:'/Home/Main'},
    ]
})

router.beforeEach( (to, from, next) => {
    if(to.path==='/UserLogin'||to.path==='/UserRegister'||to.path==='/AdministratorLogin'||to.path==='/Home/Main'||to.path==='/Home/Notice'||to.path==='/Home/Guide') {
        next();
    }else {
        let token = localStorage.getItem('token');
        if(token === null || token === '')  {
            next('/UserLogin')
        }else {
            next()
        }
    }
})

axios.interceptors.request.use(
    function (config) {
        var Token = localStorage.getItem('token');
        if(Token){
            config.headers['Authorization'] = 'Bearer' + Token;
        }
        return config;
    },
    function (error){
        return Promise.reject(error)
    }
)
export default router
