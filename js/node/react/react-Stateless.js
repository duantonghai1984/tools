//Stateless 写法
/**
 * 
 * 创建无状态函数式组件形式是从React 0.14版本开始出现的。它是为了创建纯展示组件，这种组件只负责根据传入的props来展示，不涉及到要state状态的操作。具体的无状态函数式组件，其官方指出：

  在大部分React代码中，大多数组件被写成无状态的组件，通过简单组合可以构建成其他的组件等；这种通过多个简单然后合并成一个大应用的设计模式被提倡。
无状态函数式组件形式上表现为一个只带有一个render方法的组件类，通过函数形式或者ES6 arrow function的形式在创建，并且该组件是无state状态的。具体的创建形式如下：
 * 
 */
import React, { PropTypes } from 'react';

// 组件无 state，pure function
const PreviewDevToolWebview = (props) =>{ // 箭头函数，结构赋值
  <webview className={devToolWebview.devToolWebview} src={props.remoteUrl} />;
}

PreviewDevToolWebview.proptype = {
  remoteUrl: PropTypes.string.isRequired,
};

export default PreviewDevToolWebview;

// 此类组件不支持 ref 属性，没有组件生命周期的相关的时候和方法，仅支持 propTypes
// 此类组件用以简单呈现数据