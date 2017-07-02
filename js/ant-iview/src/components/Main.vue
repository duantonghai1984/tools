<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
}

.layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.layout-nav {
    width: 420px;
    margin: 0 auto;
}

.layout-assistant {
    width: 300px;
    margin: 0 auto;
    height: inherit;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 10px;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-ceiling-main {
    float: right;
    margin-right: 15px;
}
</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1" @on-select="routeTo">
            <div class="layout-logo"></div>
            <div class="layout-ceiling-main">
                <Menu-item name="home">
                    <Icon type="home"></Icon>
                    首页
                </Menu-item>
                <Menu-item name="home">
                    <Icon type="help"></Icon>
                    帮助中心
                </Menu-item>
                <Menu-item name="3">
                    <Icon type="person"></Icon>
                    用户信息
                </Menu-item>
                <Menu-item name="logout">
                    <Icon type="log-out"></Icon>
                    退出
                </Menu-item>
            </div>
        </Menu>
        <div class="layout-content">
            <Row>
                <i-col span="3">
                    <Menu active-name="1-2" width="auto" :open-names="['1']" @on-select="routeTo">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                菜品管理
                            </template>
                            <Menu-item name="foodKind">菜品分类</Menu-item>
                            <Menu-item name="food">菜品列表</Menu-item>
                            <Menu-item name="1-3">桌台列表</Menu-item>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                订单管理
                            </template>
                            <Menu-item name="order">订单</Menu-item>
                            <Menu-item name="2-2">结账</Menu-item>
                            <Menu-item name="2-2">点餐</Menu-item>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                后台维护
                            </template>
                            <Menu-item name="3-1">清台</Menu-item>
                            <Menu-item name="3-2">交接</Menu-item>
                        </Submenu>
    
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="settings"></Icon>
                                系统设置
                            </template>
                            <Menu-item name="3-1">员工管理</Menu-item>
                            <Menu-item name="3-2">打印设置</Menu-item>
                        </Submenu>
                    </Menu>
                </i-col>
                <i-col span="21">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </i-col>
            </Row>
        </div>
        <div class="layout-copy">
            2011-2016 &copy; 美食快点
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { ajaxUrls, DateTools } from '../util/common';

export default {
    name: 'main',
    methods: {
        routeTo: function (e) {
             let _this = this;
            console.log(e);
            if (e == 'logout') {
                 sessionStorage.removeItem("login")
                axios.get(ajaxUrls.logout).then(function (resp) {
                    sessionStorage.removeItem("login")
                    _this.$router.push('login');
                }).catch(function (resp) {
                    console.log(resp)
                });
            } else {
                this.$router.push(e);
            }
        }
    }
}
</script>