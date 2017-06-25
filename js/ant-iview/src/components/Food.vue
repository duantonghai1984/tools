<style scoped>
.formItem {
    width: 250px;
}
</style>
<template>
    <div>
        <Card>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="60" inline>
    
                <Row type="flex" justify="start" align="bottom">
                    <Col span="8">
                    <Form-item label="名称" prop="pName" class="formItem">
                        <Input v-model.trim="formInline.pName" placeholder="名称"></Input>
                    </Form-item>
                    </Col>
                    <Col span="8">
                    <Form-item label="类别" prop="catogryid" class="formItem">
                        <Select v-model="formInline.catogryid" placeholder="请选择">
                            <Option value="">全部</Option>
                            <Option v-for="item in catogryList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    </Col>
    
                    <Col span="8">
                    <Form-item label="品类" prop="kind" class="formItem">
                        <Select v-model="formInline.kind" placeholder="请选择">
                            <Option value="">全部</Option>
                             <Option v-for="(item,index) in kindList" :value="index" :key="item">{{ item }}</Option>
                        
                        </Select>
                    </Form-item>
                    </Col>
                </Row type="flex" justify="center" align="bottom">
                <Form-item>
                    <Button type="success" @click="showAdd" style="margin-left: 8px">新增</Button>
                    <Button type="success" @click="handleSubmit('formInline')" style="margin-left: 8px">查询</Button>
                    <Button type="success" @click="handleReset('formInline')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </Form>
        </Card>
    
        <Table border :columns="clomuns" :data="queryReuslt" height="400" highlight-row></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page v-bind:total="this.pg.total" v-bind:current="this.pg.pgNumber" v-bind:page-size="this.pg.limit" @on-change="changePage" show-total></Page>
            </div>
        </div>
        <Modal title="详细信息" v-model="detModal">
            <p>名称：{{this.detModalData.name}}</p>
            <p>价格：{{this.detModalData.price}}</p>
            <div>
                <img v-bind:src="getImageUrl(this.detModalData.image)" alt=""></img>
            </div>
        </Modal>
    
        <Modal title="新增菜品" v-model="addModal">
            <FoodAdd ref="foodAdd"></FoodAdd>
            <div slot="footer">
            </div>
        </Modal>
    
    </div>
</template>
<script>
import axios from 'axios';
import { ajaxUrls, DateTools, PgTools, AngelTool,Tools } from '../util/common';
import FoodAdd from '@/components/FoodAdd'

export default {

    components: {
        FoodAdd,
    },

    data() {
        return {
            detModal: false,
            detModalData: {},
            catogryList: [],

            kindList:Tools.EnumTools.foodKindList,

            addModal: false,

            pg: PgTools.defPg(),
            formInline: {
                pName: '',
                catogryid: '',
                kind: '',

            },
            ruleInline: {

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
                    title: '名称',
                    key: 'name',
                    sortable: true
                },
                {
                    title: '所属类别',
                    key: 'catogryid',
                    sortable: true,
                    render: (h, params) => {
                        return h('strong', this.findCatoryName(params.row.catogryid));
                    }
                },
                {
                    title: '价格',
                    key: 'price',
                    sortable: true
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
                            }, '删除')
                        ]);
                    }
                }
            ],
            queryReuslt: [

            ]
        }
    },
    created: function () {
        let _this = this;
        axios.post(ajaxUrls.catogryList,{"pg.limit":200,}).then(function (resp) {
            _this.catogryList = resp.data.resultList;
        }).catch(function (resp) {
            console.log(resp)
        });
    },

    methods: {
        getImageUrl: function (name) {
            return AngelTool.getImageUrl(name)
        },

        findCatoryName(id) {
            for (let idx in this.catogryList) {
                if (this.catogryList[idx].id == id) {
                    return this.catogryList[idx].name;
                }
            }
            return '';
        },
        handleSubmit(name) {
            this.refreshData();
        },
        refreshData() {
            let _this = this;
            this.$refs['formInline'].validate((valid) => {
                if (valid) {
                    let pramData = _this.formInline;
                    pramData.pg = _this.pg;
                    axios.post(ajaxUrls.foodList, pramData).then(function (resp) {
                        _this.pg = PgTools.getPg(resp.data);
                        console.log(_this.pg)
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
            axios.post(ajaxUrls.delFood, { id: _this.queryReuslt[index].id }).then(function (resp) {
                if (resp.data.status == 1) {
                    _this.queryReuslt.splice(index, 1);
                    _this.$Modal.success({
                        title: title,
                        content: '操作成功!'
                    });
                } else {
                    _this.$Modal.success({
                        title: title,
                        content: '操作失败，请稍后重试!'
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