
import styles from './FoodList.css';
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import $ from "jquery";
import { NavBar, Button, WhiteSpace, Modal, Toast, Card, Icon, Stepper, TabBar, ListView, List, InputItem } from 'antd-mobile';
import { ajaxUrls, submitedOrder } from '../utils/common.js';
const Item = List.Item;
import FoodItem from '../components/FoodItem.js'
import moment from 'moment'




class MyOrder extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }


  componentDidMount() {

  }


  row = (rowData, sectionID, rowID) => {
    let obj = rowData;
    return (
      <div key={rowID} className={styles.row}>
        <FoodItem rowData={rowData} disabled={true} />
      </div>
    );
  };

  render() {
    const { orders } = this.props.ShopCard;
    let nodes = [];
    orders.map((value, index) => {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      let order = value.order;
      nodes.push(
        <div style={{ margin: '0 0' }} key={index}>
          <ListView
            key={index}
            dataSource={ds.cloneWithRows(value.goods)}
            renderHeader={() => <div>
              <span>订单号:{order.id}&nbsp;&nbsp;&nbsp;时间:{moment(order.gmtCreated).format('MM-DD hh:mm:ss')}</span>
              <WhiteSpace />
              <span>{order.deskid}号桌 {order.count}份 合计:￥{order.amount} 手机号:{order.userPhone}</span>
            </div>}
            renderRow={this.row.bind(this)}
            className="fortest"
            style={{
              height: `${value.goods.length * 3.8}rem`,
              overflow: 'auto',
              border: '1px solid #ddd',
              margin: '0rem 0',
            }}
          >
          </ListView>
          <WhiteSpace />
        </div>
      )
    });

    return (
      <div style={{ margin: '0 0', width: '96%' }}>
        {nodes}
      </div>
    );
  }
}




function mapStateToProps(state) {
  const { ShopCard } = state
  return { ShopCard };
}

export default connect(mapStateToProps)(MyOrder);

