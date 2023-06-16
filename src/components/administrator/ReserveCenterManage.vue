<template>
    <div>
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/Index/Background' }">当前位置：首页</el-breadcrumb-item>
                <el-breadcrumb-item>维护登记中心信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-top: 20px">
            <h3>维护登记中心信息</h3>
        </div>
        <div style="margin-top: 20px">
            <el-dialog title="修改预约" :visible="dialogFormVisible" width="30%" :visible.sync="dialogFormVisible">
                <el-form ref="changeForm" :model="changeForm" :rules="rules" label-width="80px">
                    <el-form-item label="编号" prop="cId">
                        <el-input size="small" type="text" :disabled="true" v-model="changeForm.cId"></el-input>
                    </el-form-item>
                    <el-form-item label="登记单位" prop="unit">
                        <el-input size="small" type="text" v-model="changeForm.unit"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="phone">
                        <el-input size="small" type="text" v-model="changeForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input size="small" type="text" v-model="changeForm.address"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-left: -80px">
                            <el-button type="primary" @click="changeCenter">立即修改</el-button>
                            <el-button @click="resetForm('changeForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div>
            <el-card class="showCard" shadow="never">
                <el-table :data="datalist" stripe style="width: 100%">
                    <el-table-column prop="cId" label="编号"></el-table-column><!--预约号-->
                    <el-table-column prop="unit" label="登记单位名"></el-table-column><!--姓名-->
                    <el-table-column prop="phone" label="联系电话"></el-table-column><!--预约单位-->
                    <el-table-column prop="address" label="地址"></el-table-column><!--状态-->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="openDialogFormVisible(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReserveCenterManage",
    data(){
        return{
            datalist:[],
            dialogFormVisible:false,
            changeForm:{
                cId:'',
                unit:'',
                phone:'',
                address:''
            },

            rules:{
                cId:[{required: true, message: "请输入编号", trigger: 'blur' }],
                unit:[{required: true, message: "请输入登记单位名", trigger: 'blur' }],
                phone:[{required: true, message: "请输入联系电话", trigger: 'blur' }],
                address:[{required: true, message: "请输入地址", trigger: 'blur' }]
            }
        }
    },

    methods:{
        getCenter(){
            this.$axios.get('/getCenter').then(res=>{
                console.log(res.data);
                if(res.data.code==1){
                    this.datalist=res.data.data;
                }else {
                    return false;
                }
            })
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        openDialogFormVisible(row){
            this.changeForm.cId=row.cId;
            this.dialogFormVisible=true;
        },

        changeCenter(){
            this.$confirm('此操作将修改预约中心数据，是否继续？', '是否修改', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(()=>{
                this.$refs.changeForm.validate((valid) =>{
                    if(valid) {
                        this.$axios.post('/changeCenter',this.changeForm).then(res=>{
                            console.log(res.data)
                            if(res.data.code==1){
                                this.$message({
                                    message: '修改成功!',
                                    type: 'success'
                                });
                                this.getCenter();
                            }else {
                                this.$message.error('修改失败!');
                                return false;
                            }
                        })
                    }
                })
            })
        },
    },

    mounted:function () {
        this.getCenter()
    }
}
</script>

<style scoped>

</style>
