<style scoped>
  .row{
     align:middle;
     height:30px;  
  }
</style>
<template>
    <div>
        <Card>
            <Row type="flex" justify="start"  class="row">
                <Col span="8">订单号：{{this.orderId}}</Col>
                <Col span="8">桌号:{{this.order.deskid}}</Col>
               
            </Row>
            <Row type="flex" justify="start"  class="row">
               <Col span="8">状态:{{this.order.staus}}</Col>
                <Col span="8">时间:{{this.order.gmtcreated}}</Col>
            </Row>
            <Row type="flex" justify="start"  class="row">
                <Col span="8">客户手机:{{this.order.userPhone}}</Col>
               
            </Row>
            <Row type="flex" justify="start"  class="row">
                <Col span="8">份数：{{this.order.count}}</Col>
                <Col span="8">合计总额:{{this.order.amount}}</Col>
            </Row>
            
        
          <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="60">
                  <Form-item label="ID" prop="id" class="formItem">
                    <Input readonly  v-model="formInline.id" disabled></Input>
                </Form-item>
         </Form>


        <Table border :columns="clomuns" :data="order.orderDet" height="400" size="small" highlight-row></Table>
        </Card>
    </div>
</template>
<script>
import axios from 'axios';
import { ajaxUrls, Tools } from '../util/common';
import FoodAdd from '@/components/FoodAdd'


export default {

    props: {
        orderId:'',
    },

    data() {
        return {
            order: {}, //当前order对象

            ruleInline: {},
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
                    title: 'orderid',
                    key: 'orderid',
                    sortable: true
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
    created: function () {
        let _this = this;
        axios.get(ajaxUrls.orderDet, { id: _this.orderId }).then(function (resp) {
            _this.order = resp.data;
            _this.order.gmtcreated = Tools.DateTools.format(_this.order.gmtcreated,'YYYY-MM-DD hh:mm:ss');
            _this.order.staus=Tools.EnumTools.orderStatus(_this.order.staus);
        }).catch(function (resp) {
            console.log(resp)
        });
    },

    methods: {

    },

}
</script>