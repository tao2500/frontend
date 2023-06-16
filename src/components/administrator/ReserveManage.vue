<template>
    <div>
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/Index/Background' }">当前位置：首页</el-breadcrumb-item>
                <el-breadcrumb-item>查询预约信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-top: 20px;text-align: center">
            <h3>查询预约信息</h3>
        </div>
        <div style="margin-top: 20px;text-align: left">
            <span>一级业务:  </span>
            <el-select v-model="getList.firstBusiness">
                <el-option value="新建房屋业务" label="新建房屋业务"></el-option>
                <el-option value="存量房业务" label="存量房业务"></el-option>
            </el-select>
            <el-button type="primary" @click="getReserve" style="margin-left: 20px">查询</el-button>
        </div>
        <div style="margin-top: 20px">
            <el-card class="showCard" shadow="never">
                <el-table :data="datalist" stripe style="width: 100%">
                    <el-table-column prop="bookId" label="预约号"></el-table-column><!--预约号-->
                    <el-table-column prop="name" label="预约人姓名"></el-table-column><!--姓名-->
                    <el-table-column prop="secondBusiness" label="二级业务"></el-table-column><!--二级业务-->
                    <el-table-column prop="time" label="预约时间"></el-table-column><!--预约时间-->
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReserveManage",

    data(){
        return{
            getList:{
                firstBusiness:''
            },
            datalist:[]
        }
    },

    methods:{
        getReserve() {
            if(this.firstBusiness!==''){
                this.$axios.post('/getReserve',this.getList).then(res=>{
                    console.log(res.data);
                    if(res.data.code==1){
                        this.$message({
                            message: '查询成功!',
                            type: 'success'
                        });
                        this.datalist=res.data.data;
                    }else {
                        this.$message.error('查询失败!');
                        return false;
                    }
                })
            }
        },
    }
}
</script>

<style scoped>

</style>
