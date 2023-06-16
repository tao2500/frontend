<template>
    <div class="login-wrap">
        <el-form  :model="loginForm" :rules="rules" ref="loginForm" class="login-container">
            <h1 class="title">用户登录</h1>
            <el-form-item label="账号" prop="account">
                <el-input type="text" v-model="loginForm.account" autocomplete="off" size="small"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password"  show-password autocomplete="off" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doLogin" style="width: 100%;">登录</el-button>
                <el-row style="text-align: center; margin-top: 10px;">
                    <el-link type="primary" @click="toRegister">用户注册</el-link> |
                    <el-link type="primary">忘记密码</el-link>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name:'Login',
    data() {
        return {
            loginForm: {
                account: '',
                password: ''
            },
            rules:{
                account: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 8, message: '用户名长度在 3 到 8 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        doLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) { //valid成功为true，失败为false
                    this.$axios.post('/UserLogin',this.loginForm).then(res=>{
                        console.log(res.data)
                        if(res.data.code==1){
                            //存储token到本地
                            this.$store.commit("setToken",res.data.token);
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                            //跳转到主页
                            this.$router.push('/Home/Main');
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

        toRegister() {
            this.$router.push('/UserRegister')
        }

    },

    computed:{
        canSubmit(){
            const {account, password} = this.loginForm
            return Boolean(account && password)
        },
    },

};
</script>

<style lang='less'>
.login-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 10%;
    background-repeat: no-repeat;
    background-position: center right;
    background-size: 100%;
}

.login-container {
    border-radius: 10px;
    margin: 0px auto;
    width: 350px;
    padding: 30px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    text-align: left;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
</style>
