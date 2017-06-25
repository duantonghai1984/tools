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
        <Modal title="详细信息" v-model="detModal">
            <p>名称：{{this.detModalData.name}}</p>
            <p>序号：{{this.detModalData.seq}}</p>
        </Modal>
    
        <Modal title="新增分类" v-model="addModal">
            <FoodKindAdd ref="foodAdd"></FoodKindAdd>
            <div slot="footer">
            </div>
        </Modal>
    
    </div>
</template>
<script>
import axios from 'axios';
import { ajaxUrls, DateTools, Tools } from '../util/common';
import FoodKindAdd from '@/components/FoodKindAdd'

export default {

    components: {
        FoodKindAdd,
    },

    data() {
        return {
            detModal: false,
            detModalData: {},
            addModal: false,

            pg: Tools.PgTools.defPg(),

            stausList:Tools.EnumTools.orderStatusList,

            formData: {
                id: '',
                userPhone: '',
                staus:'',
                gmtcreatedStart:'',
                gmtcreatedEnd:'',
            },
            ruleInline: {

            },
            
            optUrls:{
               query:ajaxUrls.orderList,
               del:ajaxUrls.delOrder,
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
                                        this.show(params.index)
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
                                        this.remove(params.index)
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
                    console.log(_this.formData);
                    let pramData = Tools.PgTools.getFormData(_this.formData);
                    pramData.pg = _this.pg;
                    console.log(pramData);
                    axios.post(_this.optUrls.query, pramData).then(function (resp) {
                        _this.pg = Tools.PgTools.getPg(resp.data);
                        _this.queryReuslt = resp.data.resultList;
                    }).catch(function (resp) {
                        console.log(resp)
                        _this.$Message.error('服务器有问题，请稍后!');
                    });

                } else {
                    _this.$Message.error('您输入的数据有问题，请检查!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        show(index) {
            this.detModal = true;
            this.detModalData = this.queryReuslt[index];
        },
        remove(index) {
            let _this = this;
            const title = '操作提示';
            axios.post(_this.optUrls.del, { id: _this.queryReuslt[index].id }).then(function (resp) {
                if (resp.data.status == 1) {
                    _this.queryReuslt.splice(index, 1);
                    _this.$Modal.success({
                        title: title,
                        content: '操作成功!'
                    });
                } else {
                    _this.$Modal.success({
                        title: title,
                        content: resp.data.errMsg,
                    });
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
            this.$refs['foodAdd'].cleanFormInlineData();
        },
    }
}
</script>