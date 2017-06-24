<style scoped>
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

.pcard {
    width: 500px;
    height: 400px;
    padding-top: 100px;
    padding-bottom: 200px;
}

.wrapper>h1 {
    text-align: center;
    vertical-align: middle;
    margin-bottom: 20px;
    color: #000;
}

.login {
    margin: 0 auto;
    padding: 200px auto;
    width: 200px;
    height: 100%;
}
</style>
<template>
    <Row type="flex" justify="center" class="code-row-bg">
        <Card class="pcard">
            <div class="wrapper">
                <h1>
                    美食快点
                </h1>
                <div class="login">
                    <i-form ref="formInline" :model="formInline" :rules="ruleInline">
                        <Form-item prop="user">
                            <Input v-model="formInline.user" placeholder="请输入用户名"></Input>
                        </Form-item>
                        <Form-item prop="password">
                            <Input v-model="formInline.password" type="password" placeholder="请输入密码"></Input>
                        </Form-item>
                        <Form-item>
                            <i-button type="success" @click.native="handleSubmit('formInline')" long>登录</i-button>
                        </Form-item>
                    </i-form>
                </div>
            </div>
        </Card>
    </Row>
</template>

<script>
import axios from 'axios';
import { ajaxUrls } from '../util/common';

export default {
    data() {
        return {
            formInline: {
                user: '',
                password: '',
            },
            ruleInline: {
                user: [{
                    required: true,
                    message: '请填写用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请填写密码',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    min: 6,
                    message: '密码长度不能小于6位',
                    trigger: 'blur'
                }]
            }
        }
    },
    
    created: function () {
        let flag= sessionStorage.getItem("login");
        if(flag || flag==1){
           this.$router.push('/food');
        }
    },
    methods: {
        handleSubmit(name) {
            var _this = this;
            const title = '登录提示';
            this.$refs[name].validate((valid) => {
                if (valid) {
                    axios.post(ajaxUrls.login, {
                        name: _this.formInline.user,
                        pwd: _this.formInline.password
                    }).then(function (resp) {
                        if (resp.data.status == 1) {
                            sessionStorage.setItem("login", "1");
                            _this.$Modal.success({
                                title: title,
                                content: '登录成功!'
                            });
                            _this.$router.push('/home');
                        } else {
                            _this.$Modal.error({
                                title: title,
                                content: '用戶名或者密码错误，请检查!'
                            });
                        }
                    }).catch(function (resp) {
                        _this.$Modal.error({
                            title: title,
                            content: '请输入正确的用户名和密码，谢谢！'
                        });
                    });

                } else {
                    _this.$Modal.info({
                        title: title,
                        content: '请输入正确的用户名和密码，谢谢！'
                    });
                }
            })
        },
        handleReset(val) {
            console.log(val)
        }
    }
}

</script>
