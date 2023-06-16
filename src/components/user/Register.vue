<template>
    <div class="register-warp">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="register-container">
            <h1 class="title">用户注册</h1>
            <el-form-item label="账号" prop="name">
                <el-input type="text" v-model="ruleForm.name" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
                <el-input type="text" v-model="ruleForm.phone" prefix-icon="el-icon-phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary" @click="submitForm">注册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (this.ruleForm.checkPass !== "") {
                this.$refs.ruleForm.validateField("checkPass");
            }
            callback();
        };

        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };

        var validatePhone = (rule, value, callback) => {
            var reg = /^1[3456789]\d{9}$/;
            if (value === "") {
                callback(new Error('手机号不能为空'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
        };

        return {
            ruleForm: {
                name:'',
                phone:'',
                pass:'',
                checkPass:'',
            },
            rules: {
                name: [
                    { required: true, message: "请输入您的名称", trigger: "blur" },
                    { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
                ],
                phone: [
                    { required: true, message: "请输入您的手机号", trigger: "blur" },
                    { validator:validatePhone, trigger: "blur"},
                ],
                pass: [
                    { required: true, validator: validatePass, trigger: "blur" }
                ],
                checkPass: [
                    { required: true, validator: validatePass2, trigger: "blur" },
                ],
            },
        };
    },

    methods: {
        submitForm(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$axios.post('/register',this.ruleForm).then(res=>{
                        console.log(res.data)
                        if(res.data.code==1){
                            this.$router.push('/UserLogin')
                        }else {
                            alert('注册失败!');
                            return false;
                        }
                    })
                } else {
                    console.log('校验失败!');
                    return false;
                }
            });
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};
</script>
<style lang='less'>
.register-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 10%;
    background-repeat: no-repeat;
    background-position: center right;
    background-size: 100%;
}

.register-container {
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

.btns {
  display: flex;
    align-items: center;
    justify-content: center;
}
</style>
