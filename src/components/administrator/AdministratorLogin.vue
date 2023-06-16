<template>
    <div class="loginbBody">
        <div class="loginDiv">
            <div class="login-content">
                <h1 class="login-title">不动产后台管理系统登录</h1>
                <el-form :model="loginForm" label-width="100px"
                         :rules="rules" ref="loginForm">
                    <el-form-item label="账号" prop="username">
                        <el-input style="width: 200px" type="text" v-model="loginForm.username"
                                  autocomplete="off" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input style="width: 200px" type="password" v-model="loginForm.password"
                                  show-password autocomplete="off" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="confirm">确 定</el-button>
                        <el-button type="primary" @click="back">返 回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdministratorLogin",
    data(){
        return{
            loginForm:{
                username:'',
                password:''
            },
            rules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 8, message: '用户名长度在 3 到 8 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        confirm(){
            this.$refs.loginForm.validate((valid) => {
                if (valid) { //valid成功为true，失败为false
                    this.$axios.post('/AdministratorLogin',this.loginForm).then(res=>{
                        console.log(res.data)
                        if(res.data.code==1){
                            //存储token到本地
                            this.$store.commit("setToken",res.data.Data.token);
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                            //跳转到主页
                            this.$router.push('/Index/Background');
                        }else {
                            this.$message.error('登录失败');
                            return false;
                        }
                    })
                } else {
                    console.log('校验失败');
                    return false;
                }
            });
        },

        back(){
            this.$router.push('/Home/Main')
        }
    }
}
</script>

<style lang="less">
.loginbBody {
    width: 100%;
    height: 100%;
    background-color: #B3C0D1;
}
.loginDiv {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -250px;
    width: 450px;
    height: 330px;
    background: #fff;
    border-radius: 5%;

}
.login-title {
    margin: 20px 0;
    text-align: center;
}
.login-content {
    width: 400px;
    height: 250px;
    position: absolute;
    top: 25px;
    left: 25px;
}
</style>
