
import React from 'react';
import PropTypes from 'prop-types'
import { Popover, Icon } from 'antd';

/**
 * 支持this指针
 */
class PreviewQRCodeBar extends React.Component { // 组件的声明方式
  constructor(props) { // 初始化的工作放入到构造函数
    super(props); // 在 es6 中如果有父类，必须有 super 的调用用以初始化父类信息

    this.state = { // 初始 state 设置方式
      visible: false,
    };
  }
  // 因为是类，所以属性与方法之间不必添加逗号
  hide() {
    this.setState({
      visible: false,
    });
  }

 //获取远程数据
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

  handleVisibleChange(visible) {
    this.setState({ visible });
  }

  render() {
    const { dataurl } = this.props;
    return (
      <Popover
        placement="rightTop"
        content={<img src={dataurl} alt="二维码" />}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange.bind(this)} // 通过 .bind(this) 来绑定
      >
        <Icon type="qrcode" />
      </Popover>
    );
  }
}
// 在 react 写法中，直接通过 propTypes {key:value} 来约定
PreviewQRCodeBar.proptypes = {
  dataurl: PropTypes.string.isRequired,
};

// 在 ES6 类声明中无法设置 props 只能在类的驻外使用 defaultProps 属性来完成默认值的设定
// 而在 react 中则通过 getDefaultProps(){} 方法来设定
PreviewQRCodeBar.defaults = {
  // obj
   dataurl: ''
}

export default PreviewQRCodeBar;
