<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.name" placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form.address" placeholder="请输入备注"></el-input>
            </el-form-item>
        </el-form>
        <div class="t-a-c">
            <el-button type="primary" @click="submit()">新增</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        components : {

        },
        data(){
            return {
                form : {
                    date : "",
                    name : "",
                    address : "",
                }
            }
        },
        methods:{
            submit(){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
    }
</script>
<style lang="scss">
.t-a-c{
    text-align: center;
}
</style>