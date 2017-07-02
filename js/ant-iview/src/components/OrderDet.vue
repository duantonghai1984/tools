<style scoped>
.row {
    align: middle;
    height: 50px;
}

.formItem {
    width: 200px;
}

.login {
    margin: 0 auto;
    padding: 0 auto;
    width: 100%;
    height: 100%;
}
</style>
<template>
    <div>
        <Card>
            <Form class="login" :model="order" label-position="right" :rules="ruleInline" :label-width="70" inline>
                <Row type="flex" justify="start" class="row">
                    <Col span="14">
                    <Form-item label="实收金额" prop="reamount" class="formItem">
                        <Input v-model="order.reamount"></Input>
                    </Form-item>
                    </Col>
    
                    <Col span="8">
                    <Button type="error" :disabled="disabledSubBtn" @click="payOrder('formInline')">结账</Button>
                    </Col>
                </Row>
    
                <Row type="flex" justify="start" class="row">
                    <Col span="12">
                    <Form-item label="订单号" prop="id" class="formItem">
                        <Input readonly v-model="this.order.id"></Input>
                    </Form-item>
                    </Col>
                    <Col span="12">
                    <Form-item label="桌号" prop="deskid" class="formItem">
                        <Input readonly v-model="order.deskid"></Input>
                    </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="start" class="row">
                    <Col span="12">
                    <Form-item label="状态" prop="stausStr" class="formItem">
                        <Input readonly v-model="order.stausStr"></Input>
                    </Form-item>
                    </Col>
                    <Col span="12">
                    <Form-item label="时间" prop="gmtcreated" class="formItem">
                        <Input readonly v-model="order.gmtcreated"></Input>
                    </Form-item>
                    </Col>
                </Row>
    
                <Row type="flex" justify="start" class="row">
                    <Col span="12">
                    <Form-item label="份数" prop="count" class="formItem">
                        <Input readonly v-model="order.count"></Input>
                    </Form-item>
                    </Col>
                    <Col span="12">
                    <Form-item label="应收总额" prop="amount" class="formItem">
                        <Input readonly v-model="order.amount"></Input>
                    </Form-item>
                    </Col>
                </Row>
    
            </Form>
    
            <br></br>
            <Table border :columns="clomuns" :data="order.orderDet" size="small" highlight-row></Table>
        </Card>
    </div>
</template>
<script>
import axios from 'axios';
import { ajaxUrls, Tools } from '../util/common';
import FoodAdd from '@/components/FoodAdd'


export default {

    props: {
        order: {}, //当前order对象
    },

    data() {
        return {
            disabledSubBtn: false,
            ruleInline: {
                reamount: [
                    { required: true, message: '不能为空', }
                ],
            },
            optUrls: {
                pay: ajaxUrls.payOrder,
                det: ajaxUrls.orderDet,
            },

            clomuns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'left'
                },
                {
                    title: '菜名',
                    key: 'foodname',
                    sortable: true
                },
                {
                    title: '数量',
                    key: 'count',
                    sortable: true
                },
                {
                    title: '价格',
                    key: 'price',
                    sortable: true
                }
            ],
        }
    },

    components: {

    },
    beforeUpdate: function () {
        /*
        alert("created");
        let _this = this;
        axios.get(ajaxUrls.orderDet, { id: _this.orderId }).then(function (resp) {
            _this.order = resp.data;
            _this.order.gmtcreated = Tools.DateTools.format(_this.order.gmtcreated, 'YYYY-MM-DD hh:mm:ss');
            _this.order.staus = Tools.EnumTools.orderStatus(_this.order.staus);
            _this.order.reamount = _this.order.amount;
        }).catch(function (resp) {
            console.log(resp)
        });
        */
    },

    methods: {
        payOrder: function () {
            let _this = this;

            if(this.order.staus==4){
                 Tools.Notify.sus(_this, '不能重复结账');
                 return;
            }
            axios.post(ajaxUrls.payOrder, { id: this.order.id, reamount: this.order.reamount }).then(function (resp) {
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
        },

        init:function(){
            this.disabledSubBtn=false;
        }
    },

}
</script>