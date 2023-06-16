<template>
    <div>
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/Index/Background' }">当前位置：首页</el-breadcrumb-item>
                <el-breadcrumb-item>添加登记中心信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="text-align: center; margin-top: 80px">
            <h3>添加登记中心信息</h3>
        </div>
        <div style="margin-top: 20px; width: 400px; margin-left: 430px">
            <el-form ref="changeForm" :model="changeForm" :rules="rules" label-width="80px">
                <el-form-item label="编号" prop="cId">
                    <el-input size="small" type="text" v-model="changeForm.cId"></el-input>
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
                <el-form-item style="margin-left: -40px">
                    <el-button type="primary" @click="addCenter">立即添加</el-button>
                    <el-button @click="resetForm('changeForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReserveCenterAdd",
    data(){
        return{
            changeForm:{
                cId:'',
                unit:'',
                phone:'',
                address:''
            },

            rules:{
                cId:[{required: true, message: "请输入编号", trigger: 'blur' }],
                unit:[{required: true, message: "请输入登记单位", trigger: 'blur' }],
                phone:[{required: true, message: "请输入电话", trigger: 'blur' }],
                address:[{required: true, message: "请输入地址", trigger: 'blur' }]
            }
        }
    },

    methods:{
        addCenter(){
            this.$refs.changeForm.validate((valid) =>{
                if(valid) {
                    this.$axios.post('/addCenter',this.changeForm).then(res=>{
                        console.log(res.data)
                        if(res.data.code==1){
                            this.$message({
                                message: '添加成功!',
                                type: 'success'
                            });
                            this.$router.push('/Index/Background');
                        }else {
                            this.$message.error('添加失败!');
                            return false;
                        }
                    })
                }
            })
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
}
</script>

<style scoped>

</style>
