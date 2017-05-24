import React  from 'react';
import styles from './PgTable.css';
import { Table, Icon,Button } from 'antd';
import { connect } from 'dva';
import request from '../utils/request';

class PgTable extends React.Component { // 组件的声明方式
  constructor(props) { // 初始化的工作放入到构造函数
    super(props); // 在 es6 中如果有父类，必须有 super 的调用用以初始化父类信息

    this.state = {
      data:[],
      pagination: {total:200,current:1,pageSize:20},
      loading: false,
      selectedRowKeys: [],
      selectedRows:[],
    };
  }

  onSelectChange = (selectedRowKeys,selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys,selectedRows});
  }

  componentDidMount() {
        this.refreshData({url:this.props.url});
  }


  refreshData=({url})=>{
    //alert("fetchData:"+url);
    //let fulr=url+"&page="+this.state.pagination.current+"&limit="+this.state.pagination.limit;
    
    this.setState({loading:true});
    $.get('/api/users',  (result)=> {
      this.setState({
        data: result,
        loading:false,
        //pagination:Object.assign({},this.state.pagination,{current:this.state.pagination.current+1}),
      });
    });
  }

  buildReqUrl=()=>{
    let fulr=this.props.url+"&page="+this.state.pagination.current+"&limit="+this.state.pagination.limit;
    return furl;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.url  && nextProps.url!=this.props.url){
        this.refreshData({url:nextProps.url});
    }
  }
  // 因为是类，所以属性与方法之间不必添加逗号
  loading = () => {
    this.setState({
      loading: false,
    });
  }

 exportFile=()=>{
   alert(this.state.selectedRowKeys);
   alert(this.state.selectedRows);
 }


 handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.refreshData(this.props.url);
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const pagination=Object.assign({}, {total:200,current:2}, this.state.pagination);
    
    return (
      <div className={styles.normal}>
        <Table rowSelection={rowSelection} columns={this.props.columns} dataSource={this.state.data} pagination={pagination}
        loading={this.state.loading} url={this.props.url}  onChange={this.handleTableChange}/>
        <Button type="primary" onClick={this.exportFile}>导出</Button>
      </div>
    );
  }
}
// 在 react 写法中，直接通过 propTypes {key:value} 来约定
PgTable.proptypes = {
 // dataurl: React.PropTypes.string.isRequired,
};

// 在 ES6 类声明中无法设置 props 只能在类的驻外使用 defaultProps 属性来完成默认值的设定
// 而在 react 中则通过 getDefaultProps(){} 方法来设定
PgTable.defaults = {
  // obj
 // dataurl: ''
}

//export default PgTable;


function mapStateToProps(state) {
  const {url}=state.SearchWin
  console.log(url);
  //return {data:data};
  return {url};
}

export default connect(mapStateToProps)(PgTable);
