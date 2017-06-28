<style scoped>
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 0px;
}


.win {
    margin: 0 auto;
    padding: 0 auto;
    width: 100%;
    height: 100%;
}

.formItem {
    width: 300px;
}
</style>
<template>
    <div class="wrapper">
        <Card class="win">
            <Form ref="formInline" :model="formData" :rules="ruleInline" :label-width="60">
                <Form-item label="ID" prop="id" class="formItem">
                    <Input readonly="true"  v-model="formData.id" disabled></Input>
                </Form-item>

                <Form-item label="名称" prop="name" class="formItem">
                    <Input v-model="formData.name" placeholder="请输入名称"></Input>
                </Form-item>
    
                <Form-item label="序号" prop="seq" class="formItem">
                    <Input-number v-model="formData.seq" :min="1" :step="1" placeholder="请输入序号"></Input-number>
                </Form-item>
    
                <Form-item label="备注" prop="des" class="formItem">
                    <Input v-model="formData.des" placeholder="请输入..."></Input>
                </Form-item>
    
                 
    
                <Form-item class="formItem">
                    <Button ref="makeSure" type="success" :disabled="disabledSubBtn" @click="handleSubmit('formInline')">确认</Button>
                    <Button type="success" @click="handleReset('formInline')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </Form>
        </Card>
    
    </div>
</template>
<script>

import axios from 'axios';
import { ajaxUrls, AngelTool, Tools } from '../util/common';


export default {

    props: {
        formData: {
            id: '',
            name: '',
            seq: 1,
            des: ''
        },
    },

    data() {
        return {
            disabledSubBtn: false,


            ruleInline: {
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                des: [
                    { required: false, message: '不能为空', trigger: 'blur' }
                ],
                seq: [
                    { required: true, message: '序号不能为空', }
                ]
            }
        }
    },
    methods: {
        cleanFormInlineData() {
           this.formData={
                name: '',
                seq: 1,
                des: '',
            };
            
        },
        handleSubmit(name) {
            var _this = this;
            const title = '操作提示';
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let paraData = _this.formData;
                    axios.post(ajaxUrls.addCatogry, paraData).then(function (resp) {
                        if (resp.data.status == 1) {
                            Tools.Notify.sus(_this, '操作成功!');
                            _this.disabledSubBtn = true;
                        } else {
                            Tools.Notify.sus(_this, '操作失败，请稍后重试');
                        }
                    }).catch(function (resp) {
                        console.log(resp)
                        Tools.Notify.sus(_this, '您输入的信息不合法，请检查');
                    });

                } else {
                    Tools.Notify.sus(_this, '您输入的数据有问题，请检查');
                }
            })
        },
        handleReset(name) {
            console.log(this.formData)
            this.$refs[name].resetFields();
        }

    }
}
</script>