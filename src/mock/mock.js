//引入mockjs
import Mock from 'mockjs'
//使用mockjs模拟数据
Mock.mock('/AdministratorLogin','post', (param)=>{
    let code=0;
    let body = JSON.parse(param.body);
    console.log(body)
    let data;
    //模拟成功数据
    if(body.username=='admin'&&body.password=='1234567'){
        code=1;
        data = Mock.mock({
            "token": "@guid()",//模拟token
        });
    }
    return{
        "code":code,
        "Data":data
    }
});

//退出
Mock.mock('/logout','post', ()=>{
    return {code:1}
});

//用户注册
Mock.mock('/register','post',(param)=>{
   let code=0;
   let body=JSON.parse(param.body);
   console.log(body);
   let data;
   if(body.name!=null&&body.phone!=null&&(body.pass==body.checkPass)){
       code=1;
   }
   return{
       "code":code,
   }
});

//用户登录
Mock.mock('/UserLogin','post', (param)=>{
    let code= 0;
    let body = JSON.parse(param.body);
    console.log(body)
    //模拟成功数据
    if(body.account=='user'&&body.password=='1234567'){
        code=1;
    }
    return{
        "code":code,
        "data":[
            {
                "token":"E6Cf70fa-E97E-C7E7-eC4c-2FD58afCc023",
                "name":"张三"
            }
        ]
    }
});

//查询预约
Mock.mock('/Query','post',(param) =>{
    let code = 0;
    let body = JSON.parse(param.body);
    console.log(body);
    //模拟返回数据
    if(body.name=='张三'&&body.phone=='15992108409'){
        code=1;
    }
    return{
        "code":code,
        "data":[
            {
                "bookId":1001,
                "name":"张三",
                "unit":'天河区不动产预约中心',
                "time":"2023-6-9 16:00",
                "state":"预约",
                "phone":"15992108409"
            },
            {
                "bookId":1002,
                "name":"张三",
                "unit":'天河区不动产预约中心',
                "time":"2023-6-9 15:30",
                "state":"预约",
                "phone":"15992108409"
            },
        ]
    }
});

//查询号球余量
Mock.mock('/GetAllowance','get',()=>{
    return{
        "code": 1,
        "data":[
            {
                "value":"09:30",
                "label":"09:30",
                "margin":"10"
            },
            {
                "value":"10:00",
                "label":"10:00",
                "margin":"10"
            },
            {
                "value":"10:30",
                "label":"10:30",
                "margin":"10"
            },
            {
                "value":"11:00",
                "label":"11:00",
                "margin":"10"
            },
            {
                "value":"11:30",
                "label":"11:30",
                "margin":"10"
            },
            {
                "value":"14:30",
                "label":"14:30",
                "margin":"10"
            },
            {
                "value":"15:00",
                "label":"15:00",
                "margin":"10"
            },
            {
                "value":"15:30",
                "label":"15:30",
                "margin":"10"
            },
            {
                "value":"16:00",
                "label":"16:00",
                "margin":"10"
            },
            {
                "value":"16:30",
                "label":"16:30",
                "margin":"10"
            },
            {
                "value":"17:00",
                "label":"17:00",
                "margin":"10"
            },
            {
                "value":"17:30",
                "label":"17:30",
                "margin":"10"
            }
        ]
    }
});

//预约
Mock.mock('/submit','post',(param)=>{
    let code=0;
    let msg="预约失败!";
    let body=JSON.parse(param.body);
    console.log(body);
    if(body.name==null){
        code=1;
        msg='预约成功!'
    }
    return{
        "code":code,
        "msg":msg
    }
});


//查询登记中心信息
Mock.mock('/getCenter','get',() =>{
    return{
        "code":1,
        "data":[
            {
                "cId":1,
                "unit":"越秀区不动产登记中心",
                "phone":'020-12345',
                "address":"越秀区北京路7号港汇大厦一楼",
            },
            {
                "cId":2,
                "unit":"海珠区不动产登记中心",
                "phone":'020-81503276',
                "address":"海珠区宝岗路65号",
            },
        ]
    }
});

//修改预约
Mock.mock('/changeReserve','post',(param)=>{
    let code=0;
    let msg="修改失败!";
    let body=JSON.parse(param.body);
    console.log(body);
    if(body.name!=null){
        code=1;
        msg='修改成功!'
    }
    return{
        "code":code,
        "msg":msg
    }
});

//删除预约
Mock.mock('/deleteReserve','post',(param)=>{
    let code=0;
    let msg="修改失败!";
    let bookId=JSON.parse(param.body);
    console.log(bookId);
    if(bookId!=null){
        code=1;
        msg='修改成功!'
    }
    return{
        "code":code,
        "msg":msg
    }
});

//查询用户状态
Mock.mock('/getUserState','get',()=>{
    return{
        "code": 1,
        "data":[
            {
                "uId":"0001",
                "phone":"15776849876",
                "password":"1234567",
                "state":"正常"
            },
            {
                "uId":"0002",
                "phone":"15776849888",
                "password":"7654321",
                "state":"禁用"
            },
        ]
    }
});

//查询用户信息
Mock.mock('/getUserInfo','get',()=>{
    return{
        "code": 1,
        "data":[
            {
                "uId":"0001",
                "name":"张三",
                "id":"440711200908072041",
            },
            {
                "uId":"0002",
                "name":"李四",
                "id":"440711200107154396",
            },
        ]
    }
});

//修改中心信息
//删除预约
Mock.mock('/changeCenter','post',(param)=>{
    let code=0;
    let msg="修改失败!";
    let body=JSON.parse(param.body);
    console.log(body);
    if(body.cId!=null){
        code=1;
        msg='修改成功!'
    }
    return{
        "code":code,
        "msg":msg
    }
});

//添加中心
Mock.mock('/addCenter','post',(param)=>{
    let code=0;
    let msg="添加失败!";
    let body=JSON.parse(param.body);
    console.log(body);
    if(body.cId!=null){
        code=1;
        msg='添加成功!'
    }
    return{
        "code":code,
        "msg":msg
    }
});

Mock.mock('/getReserve','post',(param)=>{
    let code=0;
    let msg="查询失败!";
    let body=JSON.parse(param.body);
    console.log(body.firstBusiness);
    if(body.firstBusiness=='存量房业务'){
        code=1;
        msg='查询成功!'
    }
    return{
        "code":code,
        "msg":msg,
        "data":[
            {
                "bookId":"0001",
                "name":"张三",
                "secondBusiness":"买卖",
                "time":'2023-6-12 09:30'
            },
            {
                "bookId":"0002",
                "name":"李四",
                "secondBusiness":"买卖",
                "time":'2023-6-12 16:00'
            },
        ]
    }
});

//修改网站公告
Mock.mock('/changeNotice','post',(param)=>{
    let code=0;
    let msg="修改失败!";
    let body=JSON.parse(param.body);
    console.log(body);
    if(body.main!=null){
        code=1;
        msg='修改成功!'
    }
    return{
        "code":code,
        "msg":msg
    }
});
