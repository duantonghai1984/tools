<style scoped>
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 5px;
}

.wrapper>h1 {
    text-align: center;
    vertical-align: middle;
    margin-bottom: 20px;
    color: #000;
}

.login {
    margin: 0 auto;
    padding: 20px auto;
    width: 500px;
    height: 100%;
}

.formItem{
    width:300px;
}
</style>
<template>
    <div class="wrapper">
        <div class="login">
            <Card class="login">
                <p slot="title">用户注册</p>
            <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="用户名" prop="name" class="formItem">
                    <Input v-model="formValidate.name" placeholder="请输入用户名"></Input>
                </Form-item>
                <Form-item label="密码" prop="pwd" class="formItem">
                    <Input v-model="formValidate.pwd" placeholder="请输入密码"  type="password"></Input>
                </Form-item>
                
                <Form-item label="密码" prop="pwd2" class="formItem">
                    <Input v-model="formValidate.pwd2" placeholder="请再次输入密码"  type="password"></Input>
                </Form-item>

                <Form-item label="邮箱" prop="mail" class="formItem">
                    <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
                </Form-item>
                <Form-item label="手机" prop="phone" class="formItem">
                    <Input v-model="formValidate.phone" placeholder="请输入手机号码"></Input>
                </Form-item>        
                <Form-item label="地址" prop="address" class="formItem">
                    <Input v-model="formValidate.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </Form-item>
                <Form-item class="formItem">
                    <Button type="success"  @click="handleSubmit('formValidate')" >注册</Button>
                    <Button type="success" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </i-form>
             </Card>
        </div>
        
    </div>
</template>
<script>

import axios from 'axios';
import { ajaxUrls } from '../util/common';


export default {
    data() {
        return {
            formValidate: {
                name: '',
                pwd: '',
                pwd2: '',
                mail: '',
                phone: '',
                address: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { type: 'string', min: 8, message: '不能少于8字', trigger: 'blur' }
                ],
                pwd2: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { type: 'string', min: 8, message: '不能少于8字', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机不能为空', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                    { type: 'string', min: 10, message: '不能少于10字', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
              var _this=this;

            this.$refs[name].validate((valid) => {
                if (valid) {
                    axios.post(ajaxUrls.register, _this.formValidate).then(function (resp) {
                        if(resp.data.status==1){
                        _this.$Message.success('注册成功!');
                        _this.$router.push('/login');
                        }else{
                             _this.$Message.success('注册失败，请稍后重试');
                        }
                    }).catch(function (resp) {
                        _this.$Message.error('您输入的信息不合法，请检查');
                    });

                } else {
                    this.$Message.error('您输入的数据有问题，请检查!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>