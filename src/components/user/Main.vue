<template>
    <div class="main">
        <div>
            <div>
                <h1 style="color:#4169E1; text-align: center">广州市不动产登记网上预约</h1>
            </div>
            <div v-if="token==null">
                <el-button style="margin-top:50px; margin-right:30px" type="primary" @click="goToGuide">指引</el-button>
                <el-button style="margin-top:50px; margin-left:30px" type="primary" @click="goToLogin">登录</el-button>
            </div>
            <div v-if="token!=null" style="margin-left: 20px; margin-top: 20px">
                <h1>欢迎使用广州市不动产网上预约系统！</h1>
            </div>
        </div>
    </div>
</template>


<script>
import state from "mockjs";


export default {
    name:'Main',
    data(){
      return{
          token:localStorage.getItem('token')
      }
    },
    methods:{
        goToLogin(){
            this.$router.push('/UserLogin').catch(() => {});
        },

        goToGuide(){
            this.$router.push('/Home/Guide').catch(() => {});
        }
    },


}
</script>

<style lang="less">
.main{
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/BG1.png");//背景图
    background-size: 100% 100%;
    background-position: center center;
    overflow: auto;
    position: relative;
}
</style>
