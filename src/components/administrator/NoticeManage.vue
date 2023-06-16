<template>
    <div>
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/Index/Background' }">当前位置：首页</el-breadcrumb-item>
                <el-breadcrumb-item>修改网站公告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-top: 20px">
            <h3>修改网站公告</h3>
        </div>
        <div style="margin-top: 20px">
            <el-form ref="changeForm" :model="changeForm" :rules="rules" label-width="80px">
                <el-form-item label="标题" prop="title">
                    <el-input size="small" type="text" v-model="changeForm.title"></el-input>
                </el-form-item>
                <el-form-item label="正文" prop="main">
                    <el-input size="medium" rows="10" type="textarea" v-model="changeForm.main"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: -40px">
                    <el-button type="primary" @click="changeNotice">立即添加</el-button>
                    <el-button @click="resetForm('changeForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: "NoticeManage",
    data(){
        return{
            changeForm:{
                title:'',
                main:''
            },

            rules:{
                title:[{required: true, message: "请输入标题", trigger: 'blur' }],
                main:[{required: true, message: "请输入正文", trigger: 'blur' }],
            }
        }
    },

    methods:{
        changeNotice(){
            this.$refs.changeForm.validate((valid) =>{
                if(valid) {
                    this.$axios.post('/changeNotice',this.changeForm).then(res=>{
                        console.log(res.data)
                        if(res.data.code==1){
                            this.$message({
                                message: '修改成功!',
                                type: 'success'
                            });
                            this.$router.push('/Index/Background');
                        }else {
                            this.$message.error('修改失败!');
                            return false;
                        }
                    })
                }
            })
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>

</style>
