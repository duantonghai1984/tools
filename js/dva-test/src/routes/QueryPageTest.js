import React from 'react';
import { connect } from 'dva';
import styles from './QueryPageTest.css';
import QueryWin from '../components/QueryWin.js';
import { Form, Row, Col, Input, Button, Icon } from 'antd';



 const columns = [{
  label: '名称1',
  id: 'name1',
  placeholder: 'your name1',
  width:"200px",
  required:true,
  errTip:'请输入姓名',
},{
  label: '名称2',
  id: 'name2',
  placeholder: 'your name2',
  width:"200px",
},{
  label: '名称3',
  id: 'name3',
  placeholder: 'your name3',
  type:'date',
  format:"YYYY-MM-DD HH:mm:ss",
  width:"200px",
}];

const buts={
  submitName:"保存新",
  resetName:"重置新",
};


class QueryPageTest extends React.Component{

   constructor(props) { // 初始化的工作放入到构造函数
    super(props); // 在 es6 中如果有父类，必须有 super 的调用用以初始化父类信息
    this.state = {
      form: {},
    };
  }

  submitData=(err,values)=>{
    // alert(values);
  }

  callBack=(form)=>{
    this.setState({form:form})
  }

  getData=()=>{
    alert("getDate")
    console.log(this.state.form)
   alert(this.state.form.getFieldsValue()['name1']);
  }

   render() {
    return (
       <div className={styles.normal}>
       <QueryWin columns={columns} spanWidth="24" submitData={this.submitData} callBack={this.callBack}/>
        <Button type="primary" onClick={this.getData}>获取field值</Button>
    </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(QueryPageTest);
