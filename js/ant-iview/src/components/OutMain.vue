<style scoped>
.layout {
   
   }

.layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 1px;
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
    min-height: 450px;
    margin: 15px;
    overflow: hidden;
   background: #fff;
   
}

.layout-content-main {
    aligin:center;
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
    <Row>
         <Menu   mode="horizontal" theme="light" active-name="home" v-on:on-select="routeTo">
            <div class="layout-ceiling-main">
                <Menu-item name="home">
                    <Icon type="help"></Icon>
                    帮助
                </Menu-item>
                <Menu-item name="login">
                    <Icon type="log-in"></Icon>
                    登录
                </Menu-item>

                <Menu-item name="register">
                    <Icon type="log-in"></Icon>
                    注册
                </Menu-item>
            </div>
        </Menu>
    </Row>
        <div class="layout-content">
            <Row>
                <div class="layout-content-main">
                    <router-view></router-view>
                </div>
            </Row>
        </div>
        <div class="layout-copy">
            2011-2016 &copy; 美食快点
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        routeTo: function (e) {
            console.log(e);
            this.$router.push(e);
        }
    }
}
</script>