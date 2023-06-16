<template>
    <div>
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">当前位置：首页</el-breadcrumb-item>
                <el-breadcrumb-item>预约查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <h1>不动产预约查询</h1>
        <div>
            <el-form :model="bookForm" :rules="rules" ref="bookForm" label-width="auto" class="bookForm" size="medium" style="margin-top: 20px">
                <el-row>
                    <el-col :span="3" style="text-align: left;">
                        <el-form-item label="姓名:" prop="name">
                            <el-input v-model="bookForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9" style="text-align: center; margin-left: 20px">
                        <el-form-item label="电话:" prop="phone">
                            <el-input v-model="bookForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="text-align: right">
                        <el-button type="primary" @click="checkMyBook">查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div>
            <el-dialog title="修改预约" :visible="dialogFormVisible" width="30%" :visible.sync="dialogFormVisible">
                <el-form ref="changeForm" :model="changeForm" :rules="rules" label-width="80px">
                    <el-form-item label="姓名" prop="name">
                        <el-input size="small" type="text" v-model="changeForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="phone">
                        <el-input size="small" type="text" v-model="changeForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证" prop="id">
                        <el-input size="small" type="text" v-model="changeForm.id"></el-input>
                    </el-form-item>
                    <el-form-item label="房屋所在行政区" prop="region">
                        <el-select v-model="changeForm.region" placeholder="请选择行政区" style="width: 100%">
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
                    <el-form-item label="地址" prop="address">
                        <el-input size="small" type="text" v-model="changeForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="一级业务" prop="firstBusiness" :change="changeBusiness">
                        <el-select v-model="changeForm.firstBusiness" placeholder="请选择一级业务" style="width: 100%">
                            <el-option label="新建房屋业务" value="新建房屋业务"></el-option>
                            <el-option label="存量房业务" value="存量房业务"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="二级业务" prop="secondBusiness">
                        <el-select v-model="changeForm.secondBusiness" placeholder="请选择二级业务" style="width: 100%">
                            <div v-if="changeForm.firstBusiness=='新建房屋业务'">
                                <el-option label="预售商品房登记" value="预售商品房登记"></el-option>
                            </div>
                            <div v-if="changeForm.firstBusiness=='存量房业务'">
                                <el-option label="买卖" value="买卖"></el-option>
                            </div>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="预约时间" prop="time">
                        <el-select v-model="changeForm.time" placeholder="请选择">
                            <el-option v-for="item in timeOption" :key="item.value" :label="item.label" :value="item.value">
                                <span style="float: left">{{ item.label }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">余量:{{ item.margin }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="margin-left: -80px">
                        <el-button type="primary" @click="changeBook">立即修改</el-button>
                        <el-button @click="resetForm('changeForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div>
            <el-card class="showCard" shadow="never">
                <el-table :data="datalist" stripe style="width: 100%">
                    <el-table-column prop="bookId" label="预约号"></el-table-column><!--预约号-->
                    <el-table-column prop="name" label="姓名"></el-table-column><!--姓名-->
                    <el-table-column prop="unit" label="预约单位"></el-table-column><!--预约单位-->
                    <el-table-column prop="time" label="预约时间"></el-table-column><!--预约时间-->
                    <el-table-column prop="state" label="状态"></el-table-column><!--状态-->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="dialogFormVisible = true">修改</el-button>
                            <el-button type="primary" @click="cancelBook(scope.$index,scope.row)">取消</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "Query",
    data() {
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

        return {
            dialogFormVisible:false,
            timeOption:'',
            bookForm:{
                name:'',
                phone:'',
            },

            rules:{
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { validator: checkName, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: "请输入您的手机号", trigger: "blur" },
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
            },

            changeForm:{
                name:'',
                phone:'',
                id:'',
                region:'',
                address:'',
                firstBusiness:'',
                secondBusiness:'',
                time:''
            },

            datalist:[],
            firstBusinessArray:['新建房屋业务','存量房业务'],
            secondBusinessArray: {"新建房屋业务": ['预售商品房登记','新建商品房交易等其他建房业务'],"存量房业务":['买卖','赠与与划拨等涉税业务','抵押及注销、析产登记、变更登记、补换证等其他二手房业务']},
            businessArray:[]
        }
    },

    methods:{
        checkMyBook() {
            this.$refs.bookForm.validate((valid) =>{
                if(valid) {
                    this.$axios.post('/Query',this.bookForm).then(res=>{
                        console.log(res.data)
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
            })
        },

        changeBook(){
            this.$refs.changeForm.validate((valid) =>{
                if(valid) {
                    this.$axios.post('/changeReserve',this.changeForm).then(res=>{
                        console.log(res.data)
                        if(res.data.code==1){
                            this.$message({
                                message: '修改成功!',
                                type: 'success'
                            });
                            this.datalist=res.data.data;
                        }else {
                            this.$message.error('修改失败!');
                            return false;
                        }
                    })
                }
            })
        },

        cancelBook(index,row){
            this.$confirm('此操作将取消该预约，是否继续？', '是否取消', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(()=>{
                var bookId=row.bookId
                this.$axios.post('/deleteReserve',bookId).then(res=>{
                    console.log(res.data)
                    if(res.data.code==1){
                        this.$message({
                            message: '取消成功!',
                            type: 'success'
                        });
                        this.datalist.splice(index,1);
                    }else {
                        this.$message.error('取消失败!');
                        return false;
                    }
                })
            })
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        getAllowance(){
            this.$axios.get('/GetAllowance').then(res=>{
                console.log(res.data.data)
                if(res.data.code==1){
                    this.timeOption=res.data.data;
                }else {
                    return false;
                }
            })
        }
    },

    computed:{
        changeBusiness: function (){
            if(this.changeForm.firstBusiness!==null){
                this.changeForm.secondBusiness='';
            }
        }
    },

    mounted:function () {
        this.getAllowance()
    }
}
</script>

<style scoped>

</style>
