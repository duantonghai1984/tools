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
                    <Form-item label="名称" prop="name" class="formItem">
                        <Input v-model="formInline.name" placeholder="名称"></Input>
                    </Form-item>
                    </Col>
                    <Col span="8">
                    <Form-item label="类别" prop="catogryid" class="formItem">
                        <Select v-model="formInline.catogryid" placeholder="名称">
                            <Option value="">全部</Option>
                            <Option v-for="item in catogryList" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    </Col>
    
                    <Col span="8">
                    <Form-item label="品类" prop="kind" class="formItem">
                        <Select v-model="formInline.kind" placeholder="请选择">
                            <Option value="">全部</Option>
                            <Option value="1">酒水</Option>
                            <Option value="2">饮料</Option>
                            <Option value="3">冷菜</Option>
                            <Option value="3">热菜</Option>
                        </Select>
                    </Form-item>
                    </Col>
                </Row type="flex" justify="center" align="bottom">
                <Form-item>
                    <Button type="success" @click="handleSubmit('formInline')" style="margin-left: 8px">新增</Button>
                    <Button type="success" @click="handleSubmit('formInline')" style="margin-left: 8px">查询</Button>
                    <Button type="success" @click="handleReset('formInline')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </Form>
        </Card>
    
        <Table border :columns="clomuns" :data="queryReuslt"></Table>


        <Modal
        title="对话框标题"
        v-model="detModal"
        class-name="vertical-center-modal">
        <p>对话框内容</p>
        <p>对话框内容</p>
        <p>对话框内容</p>
    </Modal>
    
    </div>

    
</template>
<script>
import axios from 'axios';
import { ajaxUrls, DateTools } from '../util/common';

export default {

    data() {
        return {
            detModal:false,
            detModalData:{},
            catogryList: [

            ],

            formInline: {
                name: '',
                catogryid:'',
                kind:'',

            },
            ruleInline: {
                
            },
            clomuns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
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
        axios.get(ajaxUrls.catogryList).then(function (resp) {
            _this.catogryList = resp.data;
        }).catch(function (resp) {
            console.log(resp)
        });
    },
    methods: {

        findCatoryName(id){
          for(let idx in this.catogryList){
              if(this.catogryList[idx].id==id){
                  return this.catogryList[idx].name;
              }
          }
          return '';
        },
        handleSubmit(name) {
            let _this = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    axios.post(ajaxUrls.foodList, _this.formInline).then(function (resp) {
                        _this.queryReuslt = resp.data;
                    }).catch(function (resp) {
                        console.log(resp)
                        this.$Message.error('服务器有问题，请稍后!');
                    });

                } else {
                    this.$Message.error('您输入的数据有问题，请检查!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        show(index) {
            this.$Modal.info({
                title: '菜品信息',
                content: `名称：${this.queryReuslt[index].name}<br>种类：${this.queryReuslt[index].catogryid}<br>价格：${this.queryReuslt[index].price}`
            })
        },
        remove(index) {
            this.queryReuslt.splice(index, 1);
        }
    }
}
</script>