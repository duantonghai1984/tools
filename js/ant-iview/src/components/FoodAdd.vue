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

.formItem {
    width: 300px;
}


.demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
<template>
    <div class="wrapper">
        <div class="login">
            <Card class="login">
                <p slot="title">用户注册</p>
    
                <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="60">
                    <Form-item label="名称" prop="name" class="formItem">
                        <Input v-model="formInline.name" placeholder="请输入名称"></Input>
                    </Form-item>
                    <Form-item label="类别" prop="catogryid" class="formItem">
                        <Select v-model="formInline.catogryid" placeholder="请选择">
                            <Option v-for="item in catogryList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
    
                    <Form-item label="品类" prop="kind" class="formItem">
                        <Select v-model="formInline.kind" placeholder="请选择">
                            <Option value="1">酒水</Option>
                            <Option value="2">饮料</Option>
                            <Option value="3">冷菜</Option>
                            <Option value="3">热菜</Option>
                        </Select>
                    </Form-item>
    
                    <Form-item label="价格" prop="price" class="formItem">
                        <Input v-model="formInline.price" placeholder="请输入价格"></Input>
                    </Form-item>
    
                    <Form-item label="图片" prop="pwd2" class="formItem">
                        <div class="demo-upload-list" v-for="item in uploadList">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
    
                        <Upload ref="upload" :show-upload-list="false"  
                        :on-success="handleSuccess" 
                        :format="['jpg','jpeg','png']" :max-size="2048" 
                        :on-format-error="handleFormatError" 
                        :on-exceeded-size="handleMaxSize" 
                        :before-upload="handleBeforeUpload" 
                        type="drag" 
                        action="/angel/food/uploadPic" 
                        style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="camera" size="20"></Icon>
                            </div>
                        </Upload>
                    </Form-item>
    
                    <Form-item class="formItem">
                        <Button type="success" @click="handleSubmit('formValidate')">注册</Button>
                        <Button type="success" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                    </Form-item>
                </Form>
            </Card>
        </div>



    <Modal title="查看图片" v-model="visible">
        <img :src="imgName" v-if="visible" style="width: 100%">
    </Modal>
    
    </div>
</template>
<script>

import axios from 'axios';
import { ajaxUrls } from '../util/common';


export default {
    data() {
        return {
            imgName: '',
            visible: false,
            uploadList: [],



            catogryList: [],
            formInline: {
                name: '',
                catogryid: '',
                kind: '',
                price: '',
                image: '',
            },
            ruleInline: {
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                catogryid: [
                    { required: true, message: '种类不能为空', trigger: 'blur' }
                ],
                kind: [
                    { required: true, message: '种类不能为空', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '价格不能为空', trigger: 'blur' },
                    { type: 'number', message: '价格格式不正确', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            var _this = this;

            this.$refs[name].validate((valid) => {
                if (valid) {
                    axios.post(ajaxUrls.register, _this.formValidate).then(function (resp) {
                        if (resp.data.status == 1) {
                            _this.$Message.success('注册成功!');
                            _this.$router.push('/login');
                        } else {
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
        },
        handleSuccess(response, file, fileList) {
            console.log(response);
            console.log(file);
            console.log(fileList);

             file.url = ajaxUrls.disImage+response.data.name
             file.name = response.data.name;

             this.uploadList = this.$refs.upload.fileList;
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },

        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
        },
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {
            // 从 upload 实例删除数据
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },handleBeforeUpload () {
                const check = this.uploadList.length < 1;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 1 张图片。'
                    });
                }
                return check;
            }
    }
}
</script>