import React from 'react';
import { connect } from 'dva';
import styles from './LoginPage.css';
import PgTable from '../components/PgTable';
import SearchPanel from '../components/SearchPanel.js';
import { Form, Row, Col, Input, Button, Icon } from 'antd';


 const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'username',
  dataIndex: 'username',
  key: 'username',
}, {
  title: 'email',
  dataIndex: 'email',
  key: 'email',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];


class LoginPage extends React.Component { // 组件的声明方式
  constructor(props) { // 初始化的工作放入到构造函数
    super(props); // 在 es6 中如果有父类，必须有 super 的调用用以初始化父类信息

    this.state = {
      pagination: {},
      selectedRowKeys: [],
      selectedRows:[],
      queryValues:[],
    };


  }

/**
 * 使用回调函数从子组件中获取数据感应
 */
 

  onSearchConditionChange(queryValues){
     this.setState({queryValues});
  }

  componentDidMount() {
       
  }

  exportExcel=()=>{
    console.log(this.state.selectedRows);
    alert(this.state.selectedRows);
  }


 onPgTableChange = (selectedRowKeys,selectedRows,pagination) => {
    this.setState({ selectedRowKeys,selectedRows,pagination});
  }

  render() {
    return (
       <div className={styles.normal}>
       <SearchPanel onSearch={(err,values)=>{ dispatch({type:'SearchWin/queryChange',payload:values})}   }/>
       <br/><br/><br/>
      <PgTable columns={columns}  url="/api/users"  parentCallBack={this.onPgTableChange} />
       <br/><br/>
       <Button type="primary" onClick={this.exportExcel}>导出Excel</Button>
    </div>
    );
  }
}


function mapStateToProps(state) {
  //const {url}=state.register
  return {};
}

export default connect(mapStateToProps)(LoginPage);
