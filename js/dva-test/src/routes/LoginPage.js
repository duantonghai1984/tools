import React from 'react';
import { connect } from 'dva';
import styles from './LoginPage.css';
import LoginWindow from '../components/LoginWindow';
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

const  LoginPage=({dispatch})=> {

  return (
    <div className={styles.normal}>
       <SearchPanel onSearch={(err,values)=>{ dispatch({type:'SearchWin/queryChange',payload:values})}}/>
       <br/><br/><br/>
      <PgTable columns={columns}  url="/api/users" />
       <br/><br/>
       <Button type="primary" onClick={()=>{ }}>导出Excel</Button>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(LoginPage);
