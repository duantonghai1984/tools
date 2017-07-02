<style scoped>
.formItem {
    width: 250px;
}
</style>
<template>
    <div>
        <Card>
            <Form ref="formInline" :model="formData" :rules="ruleInline" :label-width="60" inline>
    
                <Row type="flex" justify="start" align="bottom">
                    <Col span="8">
                    <Form-item label="订单ID" prop="id" class="formItem">
                        <Input v-model.trim="formData.id" placeholder="订单ID"></Input>
                    </Form-item>
                    </Col>
                    <Col span="8">
                    <Form-item label="客户手机" prop="userPhone" class="formItem">
                        <Input v-model.trim="formData.userPhone" placeholder="客户手机"></Input>
                    </Form-item>
                    </Col>
                    <Col span="8">
                    <Form-item label="订单状态" prop="staus" class="formItem">
                        <Select v-model.trim="formData.staus" placeholder="订单状态">
                            <Option value="">全部</Option>
                            <Option v-for="(item,index) in stausList" :value="index+1" :key="item">{{ item }}</Option>
                        </Select>
                    </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="bottom">
                    <Col span="8">
                    <Form-item label="开始时间" prop="gmtcreatedStart" class="formItem">
                        <Date-picker type="datetime" v-model.trim="formData.gmtcreatedStart" placeholder="开始时间"></Date-picker>
                    </Form-item>
                    </Col>
                    <Col span="8">
                    <Form-item label="结束时间" prop="gmtcreatedStart" class="formItem">
                        <Date-picker type="datetime" v-model.trim="formData.gmtcreatedEnd" placeholder="开始时间"></Date-picker>
                    </Form-item>
                    </Col>
                    <Col span="8"></Col>
                </Row>
                <Form-item>
                    <Button type="success" @click="showAdd" style="margin-left: 8px">新增</Button>
                    <Button type="success" @click="handleSubmit('formInline')" style="margin-left: 8px">查询</Button>
                    <Button type="success" @click="handleReset('formInline')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </Form>
        </Card>
    
        <Table border :columns="clomuns" :data="queryReuslt" height="600" highlight-row></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page v-bind:total="this.pg.total" v-bind:current="this.pg.pgNumber" v-bind:page-size="this.pg.limit" @on-change="changePage" show-total></Page>
            </div>
        </div>
        <Modal title="详细信息" v-model="detModal" width="600">
            <OrderDet ref="foodAdd" :order="orderDetObj"></OrderDet>
            <div slot="footer">
            </div>
        </Modal>
    
    </div>
</template>
<script>
import axios from 'axios';
import { ajaxUrls, DateTools, Tools } from '../util/common';
import OrderDet from '@/components/OrderDet'

export default {

    components: {
        OrderDet,
    },

    data() {
        return {
            detModal: false,
            detModalData: {},
            orderDetObj:{},
            addModal: false,

            pg: Tools.PgTools.defPg(),

            stausList: Tools.EnumTools.orderStatusList,

            formData: {
                id: '',
                userPhone: '',
                staus: '',
                gmtcreatedStart: '',
                gmtcreatedEnd: '',
            },
            ruleInline: {

            },

            optUrls: {
                query: ajaxUrls.orderList,
                del: ajaxUrls.delOrder,
            },

            clomuns: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'left'
                },
                {
                    type: 'index',
                    width: 60,
                    align: 'left'
                },
                {
                    title: '订单号',
                    key: 'id',
                    sortable: true
                },
                {
                    title: '用户手机',
                    key: 'userPhone',
                    sortable: true
                },
                {
                    title: '份数',
                    key: 'count',
                    sortable: true
                },
                {
                    title: '金额',
                    key: 'amount',
                    sortable: true
                },
                {
                    title: '状态',
                    key: 'staus',
                    sortable: true,
                    render: (h, params) => {
                        return h('strong', Tools.EnumTools.orderStatus(params.row.staus));
                    }
                },
                {
                    title: '创建时间',
                    key: 'gmtcreated',
                    sortable: true,
                    render: (h, params) => {
                        return h('strong', DateTools.format(params.row.gmtcreated));
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.showItem(params.index)
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.removeItem(params.index)
                                    }
                                }
                            }, '结账')
                        ]);
                    }
                }
            ],
            queryReuslt: [

            ]
        }
    },

    methods: {

        handleSubmit(name) {
            this.refreshData();
        },
        refreshData() {
            let _this = this;
            this.$refs['formInline'].validate((valid) => {
                if (valid) {
                    let pramData = Tools.PgTools.getPgFormData(_this.formData, _this.pg);
                    axios.post(_this.optUrls.query, pramData).then(function (resp) {
                        _this.pg = Tools.PgTools.getPg(resp.data);
                        _this.queryReuslt = resp.data.resultList;
                    }).catch(function (resp) {
                        console.log(resp)
                        Tools.Notify.error(_this, '服务器有问题，请稍后!');
                    });

                } else {
                    Tools.Notify.error(_this, '您输入的数据有问题，请检查!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        showItem(index) {
            this.detModalData = this.queryReuslt[index];
           this.$refs['foodAdd'].init();
            this.orderDetObj={};
            this.fetchOrderDet(this.detModalData.id);

            this.detModal = true;
        },

        fetchOrderDet(orderId) {
            let _this = this;
            axios.get(ajaxUrls.orderDet+"id="+orderId).then(function (resp) {
                _this.orderDetObj = resp.data;
                _this.orderDetObj.gmtcreated = Tools.DateTools.format(_this.orderDetObj.gmtcreated, 'YYYY-MM-DD hh:mm:ss');
                _this.orderDetObj.stausStr = Tools.EnumTools.orderStatus(_this.orderDetObj.staus);
                _this.orderDetObj.reamount = _this.orderDetObj.amount;
            }).catch(function (resp) {
                console.log(resp)
            });
        },
        removeItem(index) {
            let _this = this;
            axios.post(_this.optUrls.del, { id: _this.queryReuslt[index].id }).then(function (resp) {
                if (resp.data.status == 1) {
                    _this.queryReuslt.splice(index, 1);
                    Tools.Notify.sus(_this, '操作成功!');
                } else {
                    Tools.Notify.sus(_this, resp.data.errMsg);
                }
            }).catch(function (resp) {
                console.log(resp)
            });
        },
        changePage(pageNum) {
            this.pg.pgNumber = pageNum;
            this.refreshData();
        },

        showAdd() {
            this.addModal = true;
            this.$refs['foodAdd'].init();
        },
    }
}
</script>