<template>
    <div>
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/Index/Background' }">当前位置：首页</el-breadcrumb-item>
                <el-breadcrumb-item>查询用户状态</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="text-align: center">
            <h3>用户状态</h3>
        </div>
        <div style="margin-top: 20px">
            <el-card class="showCard" shadow="never">
                <el-table :data="datalist" stripe style="width: 100%">
                    <el-table-column prop="uId" label="用户ID"></el-table-column><!--用户ID-->
                    <el-table-column prop="phone" label="手机号"></el-table-column><!--手机号-->
                    <el-table-column prop="password" label="密码"></el-table-column><!--密码-->
                    <el-table-column prop="state" label="状态"></el-table-column><!--状态-->
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserState",
    data(){
        return{
            datalist:[]
        }
    },

    methods:{
        getUserState(){
            this.$axios.get('/getUserState').then(res=>{
                console.log(res.data)
                if(res.data.code==1){
                    this.datalist=res.data.data;
                }else {
                    return false;
                }
            })
        }
    },

    mounted:function () {
        this.getUserState();
    },
}
</script>

<style scoped>

</style>
