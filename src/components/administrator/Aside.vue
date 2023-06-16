<template>
    <div>
        <el-menu background-color="#545c64" text-color="#ffffff"
                 active-text-color="#ffd04b" default-active="2"
                 router>
            <el-submenu :index="item.path" v-for="item in menu_data" :key="item.name">
                <template slot="title"><i :class="item.icon"></i><span>{{item.name}}</span></template>
                <el-menu-item :index="child.path" v-for="child in item.child" :key="child.name">
                    <i :class="child.icon"></i>{{child.name}}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "Aside",
    data(){
        return {
            menu_data:[
                {
                    name:'登记中心维护',
                    icon:'el-icon-office-building',
                    path:'/Index/ReserveCenterManage',
                    child:[
                        {
                            name:'维护登记中心信息',
                            icon:'el-icon-office-building',
                            path:'/Index/ReserveCenterManage'
                        },
                        {
                            name:'添加登记中心信息',
                            icon:'el-icon-office-building',
                            path:'/Index/ReserveCenterAdd'
                        },
                    ]
                },
                {
                    name:'网站公告维护',
                    icon:'el-icon-s-comment',
                    path:'/Index/NoticeManage',
                    child:[
                        {
                            name:'修改网站公告',
                            icon:'el-icon-s-comment',
                            path:'/Index/NoticeManage'
                        }
                    ]
                },
                {
                    name:'预约信息维护',
                    icon:'el-icon-notebook-2',
                    path:'/Index/ReserveManage',
                    child:[
                        {
                            name:'查询预约信息',
                            icon:'el-icon-notebook-2',
                            path:'/Index/ReserveManage'
                        }
                    ]
                },
                {
                    name:'用户信息维护',
                    icon:'el-icon-s-custom',
                    path:'/Index/UserInfo',
                    child: [
                        {
                            name:'查询用户信息',
                            icon:'el-icon-s-custom',
                            path:'/Index/UserInfo'
                        },
                        {
                            name:'修改用户信息',
                            icon:'el-icon-s-custom',
                            path:'/Index/UserState'
                        }
                    ]
                }
            ]
        }
    },
    methods: {

    }
}
</script>

<style scoped>
</style>
