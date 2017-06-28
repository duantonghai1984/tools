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
                    <Form-item label="名称" prop="pName" class="formItem">
                        <Input v-model.trim="formData.pName" placeholder="名称"></Input>
                    </Form-item>
                    </Col>
                    <Col span="8"></Col>
                    <Col span="8"></Col>
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
       
    
        <Modal title="新增分类" v-model="addModal">
            <FoodKindAdd ref="foodAdd"  :formData="updateModalData"></FoodKindAdd>
            <div slot="footer">
            </div>
        </Modal>
    
    </div>
</template>
<script>
import axios from 'axios';
import { ajaxUrls, DateTools, PgTools, Tools,AngelTool } from '../util/common';
import FoodKindAdd from '@/components/FoodKindAdd'

export default {

    components: {
        FoodKindAdd,
    },

    data() {
        
        return {
            
            addModal: false,
            updateModalData:{},

            pg: PgTools.defPg(),

            formData: {
                pName: '',
                catogryid: '',
            },
            ruleInline: {

            },
            
            optUrls:{
               query:ajaxUrls.catogryList,
               add:ajaxUrls.addCatogry,
               del:ajaxUrls.delCatogry,
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
                    title: '序号',
                    key: 'seq',
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
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除'),
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
                                        this.update(params.index)
                                    }
                                }
                            }, '更新')
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
                    let pramData = _this.formData;
                    pramData.pg = _this.pg;
                    axios.post(_this.optUrls.query, pramData).then(function (resp) {
                        _this.pg = PgTools.getPg(resp.data);
                        _this.queryReuslt = resp.data.resultList;
                    }).catch(function (resp) {
                        console.log(resp)
                          Tools.Notify.sus(_this, '服务器有问题，请稍后');
                    });

                } else {
                    Tools.Notify.sus(_this, '您输入的数据有问题，请检查');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        remove(index) {
            let _this = this;
            const title = '操作提示';
            axios.post(_this.optUrls.del, { id: _this.queryReuslt[index].id }).then(function (resp) {
                if (resp.data.status == 1) {
                    _this.queryReuslt.splice(index, 1);
                     Tools.Notify.sus(_this, '操作成功');
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
        update(index){
            this.addModal = true;
            this.updateModalData=this.queryReuslt[index];
            //this.$refs['foodAdd'].cleanFormInlineData();
        },
        changePage(pageNum) {
            this.pg.pgNumber = pageNum;
            this.refreshData();
        },

        showAdd() {
            this.addModal = true;
            this.$refs['foodAdd'].cleanFormInlineData();
            this.updateModalData={};
        },
    }
}
</script>