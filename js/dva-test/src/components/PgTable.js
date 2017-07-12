import React from 'react';
import styles from './PgTable.css';
import { Table, Icon, Button } from 'antd';
import { connect } from 'dva';
import $ from "jquery";
import PropTypes from 'prop-types'

class PgTable extends React.Component { // 组件的声明方式
  constructor(props) { // 初始化的工作放入到构造函数
    super(props); // 在 es6 中如果有父类，必须有 super 的调用用以初始化父类信息

    this.state = {
      data: [],
      pg: { total: 0, current: 1, pageSize: 20,showSizeChanger:true, },
      loading: false,
      selectedRowKeys: [],
      selectedRows: [],
    };

  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
    const { pagination } = this.state.pg;
    if (this.props.parentCallBack) {
      this.props.parentCallBack(selectedRowKeys, selectedRows, pagination);
    }
  }

  componentDidMount() {
    if (this.props.url) {
      this.refreshData({ url: this.props.url });
    }
  }


  refreshData = (url, pg) => {
    this.setState({ loading: true });
    let paraData=this.props.paraData;
    paraData.pg.pgNumber=this.state.pg.current;
    paraData.pg.limit=this.pg.pageSize
    $.post(url,paraData, (result) => {
      this.setState({
        data: result.resultList,
        loading: false,
        pg: Object.assign({}, this.state.pagination, { current: result.pgNumber, total: result.totalCount, pageSize: result.limit }),
      });
    });
  }


  componentWillReceiveProps(nextProps) {
    /*
    if (nextProps.url && nextProps.url != this.props.url) {
      this.refreshData({ url: nextProps.url });
    }*/

     if (nextProps.params) {
      this.refreshData(url=this.props.url);
    }
  }
  // 因为是类，所以属性与方法之间不必添加逗号
  loading = () => {
    this.setState({
      loading: false,
    });
  }


  tableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pg: pager,
    });
    this.refreshData(this.props.url, pagination);
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };


    return (
      <div className={styles.normal}>
        <Table rowSelection={rowSelection} columns={this.props.columns} dataSource={this.state.data} pagination={this.state.pg}
          loading={this.state.loading} url={this.props.url} onChange={this.tableChange.bind(this)} scroll={{ x: true }} size="middle" showSizeChanger  bordered  />
      </div>
    );
  }
}
// 在 react 写法中，直接通过 propTypes {key:value} 来约定
PgTable.proptypes = {
  // dataurl: React.PropTypes.string.isRequired,
  params: PropTypes.any,
};

// 在 ES6 类声明中无法设置 props 只能在类的驻外使用 defaultProps 属性来完成默认值的设定
// 而在 react 中则通过 getDefaultProps(){} 方法来设定
PgTable.defaults = {
  // obj
  // dataurl: ''
  params:{},
}

export default PgTable;



