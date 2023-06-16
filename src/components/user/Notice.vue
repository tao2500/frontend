<template xmlns="http://www.w3.org/1999/html">
    <div class="app-container">
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">当前位置：首页</el-breadcrumb-item>
                <el-breadcrumb-item>公示公告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="color: #be4444; text-align: center; margin-top: 20px">
            <h1>广州市不动产登记中心2023年劳动节放假通告</h1>
        </div>
        <div style="text-align: center; margin-top: 20px">
            <h5>来源：广州市不动产登记中心 发布时间：2023-04-18 16:12:06</h5>
        </div>
        <div style="margin-top: 20px; font-size: 20px; text-align: left; margin-left: 150px;">
            <pre>
    根据《国务院办公厅关于2023年部分节假日安排的通知》，广州市不动产登记中心2023年劳动节放假时间为：2023年4月29日
（星期六）至5月3日（星期三），共5天。4月23日（星期日）、5月6日（星期六）上班。4月22日（星期六）不对外服务。
    特此通告。


                                                                                             广州市不动产登记中心
　　                                                                                                2023年4月17日
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    name: "Notice"
}
</script>

<style lang="less">

</style>
