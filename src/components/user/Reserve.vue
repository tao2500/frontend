<template xmlns="http://www.w3.org/1999/html">
    <div class="app-container">
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">当前位置：首页</el-breadcrumb-item>
                <el-breadcrumb-item>不动产预约</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-steps :active="active" finish-status="success" align-center style="margin-top: 15px">
            <el-step title="阅读协议"></el-step>
            <el-step title="预约填表"></el-step>
            <el-step title="选择业务"></el-step>
            <el-step title="服务窗口"></el-step>
            <el-step title="预约结果"></el-step>
        </el-steps>
        <div v-if="active==0" style="margin-left: 150px;margin-top: 20px">
            <h1>广州市不动产登记网上预约须知</h1>
            <pre style="color: red; text-align: left">
温馨提示：

1、按照疫情防控要求，原则上，除企业之间、因入学需要等紧急情况或持二代身份证以外的其他身份证件办理登记以外，办理不动产登记业务均须提前预约。

2、企业办理存量房交易业务，可直接前往各登记中心企业服务专窗办理，无需任何预约取号。
            </pre>
            <pre style="text-align: left">

为方便您有效进行预约，请抽空详细阅读以下预约规则：

一、预约采用实名制，预约人须为不动产登记当事人（包括交易双方、所有权人、抵押人、抵押权人及其代理人等）。预约人须如实填写预约信息，如现场资料与预约信息不符，不动产登记机构将不予办理。

二、无法如期前来办理的，预约人应在预约时间段结束前2个小时通过预约平台自行取消预约；无法网上自行取消的，可向提供预约服务的任一登记机构申请取消。

三、预约系统提供未来7天的预约号源，每天中午12点开始放号，取消的预约号时段结束前2小时重新放回号池对外预约。

四、同一手机号一天内取消预约两次及以上当天不能预约，同一个月内取消预约三次及以上当月不能预约；同一房屋同一业务类型一个月连续3次预约成功后取消办理的，当月不能再次预约。

五、同一房屋如有未办结的预约，须待现有预约办结或取消后方可再次预约。

六、同一手机号同一时段只能预约一个登记机构。

七、全部申请人须在约定日期预约时段的最后10分钟前（如：预约10：30-11：00的须于当天10：50前报到）带齐全部登记资料前往约定登记机构报到，预约下午时段的只能下午报到，逾期报到或资料不齐的预约失效。

八、约定办理时间未按时报到的视作失约，三次失约将被纳入“失信名单”，三个月内无法进行网上预约。
            </pre>
            <el-checkbox v-model="checked" @change="changeButton">我已阅读并同意以上规则</el-checkbox>
            <el-button style="margin-left: 20%" type="primary"  @click="next" :disabled="changeButton">下一步</el-button>
        </div>

        <div v-if="active==1">
            <div>
                <h1>预约申请信息</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="ruleFrom" size="medium" style="margin-top: 20px">
                    <el-row>
                        <el-col :span="6" style="text-align: left">
                            <el-form-item label="申请人姓名" prop="name" >
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系手机号码" prop="phone" style="text-align: right">
                                <el-input v-model="ruleForm.phone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <el-form-item label="身份证号" prop="id" style="text-align: right">
                                <el-input v-model="ruleForm.id"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" style="text-align: left">
                            <el-form-item label="房屋所在行政区" prop="region">
                                <el-select v-model="ruleForm.region" placeholder="请选择行政区">
                                    <el-option label="越秀区" value="1"></el-option>
                                    <el-option label="海珠区" value="2"></el-option>
                                    <el-option label="荔湾区" value="3"></el-option>
                                    <el-option label="天河区" value="4"></el-option>
                                    <el-option label="白云区" value="5"></el-option>
                                    <el-option label="番禺区" value="6"></el-option>
                                    <el-option label="南沙区" value="7"></el-option>
                                    <el-option label="增城区" value="8"></el-option>
                                    <el-option label="从化区" value="9"></el-option>
                                    <el-option label="花都区" value="10"></el-option>
                                    <el-option label="黄埔区" value="11"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="不动产证地址" prop="address">
                                <el-input v-model="ruleForm.address"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <h3 style="background-color:#FFFFCC; text-align: left; color: red">［ 提示：预约人无法按时前来现场办理业务，应提前一天自行取消预约，否则视为失约。预约人在预约业务办理结束前无法再次预约。］</h3>
                    <el-form-item style="margin-top: 20px; margin-left: -120px">
                        <el-button style="margin-top:12px; margin-right: 30px" type="primary" @click="prev">上一步</el-button>
                        <el-button style="margin-top: 12px; margin-left: 30px" type="primary" @click="next">下一步</el-button>//"next2('ruleForm')"
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div v-if="active==2">
            <div>
                <h1>选择业务</h1>
                <div style="background-color: #99CCFF; margin-top:20px; text-align: left; font-size: 20px; height: 40px">
                    <div style="margin-top: 15px; margin-bottom: 15px">
                        <pre>姓名： {{ruleForm.name}}  身份证： {{ruleForm.id}}</pre>
                    </div>
                </div>
                <div style="background-color: #99CCFF; margin-top:20px; text-align: left; font-size: 20px; height: 40px">
                    <div style="margin-top: 15px; margin-bottom: 15px">
                        <p>{{ruleForm.firstBusiness}}-{{ruleForm.secondBusiness}}</p>
                    </div>
                </div>
                <h4 style="text-align: center; margin-right: 400px; margin-top: 10px">请选择业务类型:</h4>
                <div style="margin-top: 10px" class="business-radioButton">
                    <el-radio-group v-model="ruleForm.firstBusiness" text-color="#333333" fill="#FF9900">
                        <el-radio-button label="新建房屋业务" style="margin-right: 20px" @change="changeRadio">新建房屋业务</el-radio-button>
                        <el-radio-button label="存量房业务" style="margin-left: 20px" @change="changeRadio">存量房业务</el-radio-button>
                    </el-radio-group>
                </div>
                <hr style="margin-top: 20px">
                <h4 style="margin-bottom: -10px">{{ruleForm.firstBusiness}}</h4>
                <div style="margin-top: 10px">
                    <div v-if="ruleForm.firstBusiness === '新建房屋业务'">
                        <el-radio-group v-model="ruleForm.secondBusiness">
                            <el-row style="text-align: left; width: 100%; margin-top: 10px"><el-radio label="预售商品房登记">预售商品房登记</el-radio></el-row>
                            <el-row style="text-align: left; width: 100%; margin-top: 10px"><el-radio label="新建商品房交易等其他建房业务">新建商品房交易等其他建房业务</el-radio></el-row>
                        </el-radio-group>
                    </div>
                    <div v-if="ruleForm.firstBusiness === '存量房业务'">
                        <el-radio-group v-model="ruleForm.secondBusiness">
                            <el-row style="text-align: left; width: 100%; margin-top: 10px"><el-radio label="买卖">买卖</el-radio></el-row>
                            <el-row style="text-align: left; width: 100%; margin-top: 10px"><el-radio label="赠与与划拨等涉税业务">赠与与划拨等涉税业务</el-radio></el-row>
                            <el-row style="text-align: left; width: 100%; margin-top: 10px"><el-radio label="抵押及注销、析产登记、变更登记、补换证等其他二手房业务">抵押及注销、析产登记、变更登记、补换证等其他二手房业务</el-radio></el-row>
                        </el-radio-group>
                    </div>
                </div>
                <el-button style="margin-top:12px;" type="primary" @click="prev">上一步</el-button>
                <el-button style="margin-top: 12px;" type="primary" @click="next3">下一步</el-button>
            </div>
        </div>
        <div v-if="active==3">
            <div>
                <h1>服务窗口</h1>
            </div>
            <div style="background-color: #99CCFF; margin-top:20px; text-align: left; font-size: 20px;">
                <pre style="margin-top: 10px">
                    姓名： {{ruleForm.name}}  身份证： {{ruleForm.id}}
                    房屋所属行政区:{{ruleForm.region}}
                    预约业务:{{ruleForm.firstBusiness}}-{{ruleForm.secondBusiness}}
                </pre>
            </div>
            <div style="margin-top: 20px; text-align: center">
                <span>预约单位:  </span>
                <el-select v-model="ruleForm.unit" placeholder="请选择预约单位">
                    <el-option label="越秀区不动产登记中心" value="1"></el-option>
                    <el-option label="海珠区不动产登记中心" value="2"></el-option>
                    <el-option label="荔湾区不动产登记中心" value="3"></el-option>
                    <el-option label="天河区不动产登记中心" value="4"></el-option>
                    <el-option label="白云区不动产登记中心" value="5"></el-option>
                    <el-option label="番禺区不动产登记中心" value="6"></el-option>
                    <el-option label="南沙区不动产登记中心" value="7"></el-option>
                    <el-option label="增城区不动产登记中心" value="8"></el-option>
                    <el-option label="从化区不动产登记中心" value="9"></el-option>
                    <el-option label="花都区不动产登记中心" value="10"></el-option>
                    <el-option label="黄埔区不动产登记中心" value="11"></el-option>
                </el-select>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <span>预约日期:  </span>
                <el-date-picker v-model="ruleForm.date" value-format="yyyy-MM-dd" type="date" placeholder="请选择日期" :picker-options="pickerOptions"></el-date-picker>
            </div>
            <div style="margin-top: 20px; text-align: center">
                <span>预约时间:  </span>
                <el-select v-model="ruleForm.time" placeholder="请选择">
                    <el-option v-for="item in timeOption" :key="item.value" :label="item.label" :value="item.value">
                        <span style="float: left">{{ item.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">余量:{{ item.margin }}</span>
                    </el-option>
                </el-select>
            </div>
            <h3 style="background-color:#FFFFCC; text-align: left; color: red; margin-top: 20px">［ 提示：可预约时间段为每天早上09:30-11:30，下午14:30-17:30，预约时间段为30分钟，最少提前1天预约，最多可提前7天预约！］</h3>
            <el-button style="margin-top:12px;" type="primary" @click="prev">上一步</el-button>
            <el-button style="margin-top: 12px;" type="primary" @click="submit">提交</el-button>
        </div>
        <div v-if="active==4">
            <h1>预约结果</h1>
            <div v-if="flag==true">
                <el-result icon="success" title="预约成功">
                    <template slot="extra">
                        <el-button type="primary" size="medium" @click="back">返回</el-button>
                    </template>
                </el-result>
            </div>
            <div v-if="flag==false">
                <el-result icon="error" title="预约失败">
                    <template slot="extra">
                        <el-button type="primary" size="medium"  @click="back">返回</el-button>
                    </template>
                </el-result>
            </div>
        </div>

    </div>
</template>


<script>
export default {
    name:'Reserve',
    data() {
        //姓名验证
        var checkName = (rule, value, callback) => {
            var reg = /^[\u4E00-\u9FA5]+$/;
            if (value === "") {
                callback(new Error('姓名不能为空'));
            } else if (!reg.test(value)) {
                callback(new Error('姓名须由汉字组成'));
            } else {
                callback();
            }
        };

        //手机号验证
        var checkPhone = (rule, value, callback) => {
            var reg = /^1[3456789]\d{9}$/;
            if (value === "") {
                callback(new Error('手机号不能为空'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
        };

        //身份证验证
        //通过校验身份证的最后一位的验证码来验证身份证号是否有效
        var checkId = (rule, value, callback) => {
            //身份证正则表达式（18位）
            var reg = /^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i;
            var stard = "10X98765432";//最后一位身份证的对应验证码
            var first = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            var sum = 0;
            if(!reg.test(value)) {
                callback(new Error('请输入正确的身份证号'));
            }
            var year = value.substr(6,4);
            var month = value.substr(10,2);
            var day = value.substr(12,2);
            var birthday =value.substr(6,8);
            if(birthday !== dateToString(new Date(year + '/' +month + '/' + day))) {
                callback(new Error('请输入正确的身份证号'));
            }
            for (var i=0;i<value.length-1;i++) {
                sum += value[i] * first[i];
            }
            var result = sum % 11;
            var last =stard[result];
            if (value[value.length-1].toUpperCase() === last) {
                callback();
            } else {
                callback(new Error('请输入正确的身份证号'));
            }
        };

        //日期转字符串 返回格式yyyymmdd
        function dateToString(date) {
            if (date instanceof Date) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                month = month < 10 ? '0' + month: month;
                var day = date.getDate();
                day = day < 10 ? '0' + day: day;
                return year + month + day;
            }
            return '';
        };

        return {
            active: 0,//步骤条初始化
            checked:false,
            time1:'',
            time2:'',
            timeOption:'',
            flag:false,
            ruleForm:{
                name:'',
                id:'',
                phone:'',
                region:'',
                address:'',
                firstBusiness:'',
                secondBusiness:'',
                unit:'',
                date:'',
                time:''
            },

            pickerOptions: {
                disabledDate(time) {
                    const dateTime = new Date()
                    const startTime = dateTime.setDate(dateTime.getDate())
                    const endTime = dateTime.setDate(dateTime.getDate() + 1)
                    return (
                        time.getTime() < new Date(startTime).getTime() ||
                        time.getTime() > new Date(endTime).getTime()
                    )
                },
            },

            rules:{
                name: [
                    { required: true, message:"姓名不能为空" },
                    { validator: checkName, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message:"手机号不能为空" },
                    { validator: checkPhone, trigger: 'blur' }
                ],
                id: [
                    { required: true, message:"身份证号不能为空" },
                    { validator: checkId, trigger: 'blur' }
                ],
                region: [
                    { required: true, message: "请选择房屋所在行政区", trigger: 'blur' }
                ],
                address: [
                    { required: true, message:"地址不能为空" }
                ]
            }
        }
    },

    methods: {
        //下一页
        next() {
            if (this.active++ > 4) this.active = 0;
        },

        //上一页
        prev() {
            if (this.active > 0) this.active--;
        },

        //预约表单验证
        next2(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.active++ > 4) this.active = 0;
                } else {
                    console.log("error submit!");
                    return false;
                }
            });
        },

        next3() {
            if(this.ruleForm.secondBusiness!=='未选择业务类型!'){
                this.$axios.get('/GetAllowance').then(res=>{
                    console.log(res.data.data)
                    if(res.data.code==1){
                        this.timeOption=res.data.data;
                    }else {
                        return false;
                    }
                })
                if (this.active++ > 4) this.active = 0;
            }else {
                alert('未选择业务类型！')
                console.log("error submit!");
                return false;
            }
        },

        submit(){
          this.$axios.post('/submit',this.ruleForm).then(res=>{
              console.log(res.data)
              if(res.data.code==1){
                  this.$message({
                      message: '预约成功',
                      type: 'success'
                  });
                  this.flag=true;
              }else {
                  this.$message.error('预约失败');
              }
              if (this.active++ > 4) this.active = 0;
          })
        },

        back(){
            this.$router.push('/Home/Main')
        },

        disabledDate (time) {
            const dateTime = new Date()
            const startTime = dateTime.setDate(dateTime.getDate() - 1)
            const endTime = dateTime.setDate(dateTime.getDate() + 7)
            return (
                time.getTime() < new Date(startTime).getTime() ||
                time.getTime() > new Date(endTime).getTime()
            )
        },


    },

    computed: {
        changeButton: function (){
            let buttonStatus = false;
            if(this.checked === false){
                buttonStatus = true;
            }else {
                buttonStatus = false;
            }
            return buttonStatus;
        },

        changeRadio: function (){
            if(this.ruleForm.firstBusiness!==null){
                this.ruleForm.secondBusiness='未选择业务类型!';
            }
        },
    },
}
</script>

<style lang="less">
.business-radioButton{
    .el-radio-button__inner{
        width: 200px;
        height: 60px;
        text-align: center;
        background-color: #00CC00;
        color: #333333;
        font-size: 25px;
    }
}
</style>
