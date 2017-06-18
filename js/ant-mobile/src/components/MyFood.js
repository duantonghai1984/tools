
import styles from './FoodList.css';
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import $ from "jquery";
import { NavBar, Button, WhiteSpace, Modal, Toast, Card, Icon, Stepper, TabBar, ListView, List, InputItem } from 'antd-mobile';
import { ajaxUrls, submitedOrder,SessionUtil } from '../utils/common.js';
const Item = List.Item;
import FoodItem from '../components/FoodItem.js'



function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}


class MyFood extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
   
  }


  onEndReached = (event) => {

  }

  orderFood = (value) => {
    if (!value || value.length < 5) {
      Modal.alert('', '请输入正确手机号');
      return;
    }

    let order = new Object();
    order.shopid = this.props.ShopCard.shopId;
    order.count = this.props.ShopCard.total.foodCount;
    order.amount = this.props.ShopCard.total.amount;
    order.deskid = this.props.ShopCard.deskId;
    order.gmtCreated=new Date();
    if (value && value.length > 5) {
      order.userPhone = value;
    }

    let orderDet = new Array();
    this.props.goods.map(value => {
      let det = new Object();
      det.foodid = value.id;
      det.foodname = value.name;
      det.count = value.count;
      det.price = value.price;
      orderDet.push(det);
    });
    order.orderDet = orderDet;
    // let data={order:order,orderDet:orderDet};
    $.post({
      url: ajaxUrls.createOrder,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(order),
    }, (result) => {
      if (result.status == 1) {
        order.id=result.data.id;
        let sorder = new submitedOrder(result.data.id, order, this.props.goods);
        SessionUtil.addOrder(sorder);
        let action = { order: SessionUtil.getOrders() };
        this.props.dispatch({ type: 'ShopCard/submitOrder', ...action })
        Toast.success(`下单成功，请安心等待，订单号:${result.data.id}`, 3);
      } else {
        Toast.fail(`下单失败`, 3);
      }
    });
  }



  confirmOrder = () => {
    if (this.props.ShopCard.total.foodCount < 1) {
      Modal.alert('', '您还没有点菜');
      return;
    }

    let shopCardInfo = `${this.props.ShopCard.deskId}桌 ${this.props.ShopCard.total.foodCount}份 合计：￥${this.props.ShopCard.total.amount}`

    Modal.prompt('下单确认', `您当前共${shopCardInfo},请确认。如果无误,请输入手机号下单`, [
      { text: '取消' },
      { text: '提交', onPress: value => { this.orderFood(value) } },
    ], 'plain-text')
  }

  renderHeader = () => {
    let shopCardInfo = `${this.props.ShopCard.deskId}桌 ${this.props.ShopCard.total.foodCount}份 合计：￥${this.props.ShopCard.total.amount}`

    return (
      <div><span>{shopCardInfo}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button type="primary" size="small" onClick={this.confirmOrder.bind(this)} inline>确认下单</Button></div>
    );
  };


  row = (rowData, sectionID, rowID) => {
    let obj = rowData;
    return (
      <div key={rowData.id} className={styles.row}>
        <FoodItem rowData={rowData} />
      </div>
    );
  };

  render() {
     const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <div style={{ margin: '0 0', width: '96%' }}>
        <ListView
          dataSource={ds.cloneWithRows(this.props.goods)}
          renderHeader={this.renderHeader.bind(this)}
          renderRow={this.row.bind(this)}
          className="fortest"
          style={{
            height: document.documentElement.clientHeight * 4 / 5,
            overflow: 'auto',
            border: '1px solid #ddd',
            margin: '0.5rem 0',
          }}
          pageSize={4}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll'); }}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />

        <WhiteSpace />

      </div>
    );
  }
}


MyFood.propTypes = {

};

MyFood.defaultProps = {

}

function mapStateToProps(state) {
  const { ShopCard } = state

  let goods = [];

  if (!ShopCard || !ShopCard.goods) {
    return { goods };
  }
  for (let idx in ShopCard.goods) {
    console.log(ShopCard.goods[idx]);
    if (ShopCard.goods[idx].count > 0) {
      let obj = ShopCard.goods[idx].good;
      obj.count = ShopCard.goods[idx].count;
      goods.push(obj);
    }
  }
  return { goods, ShopCard };
}

export default connect(mapStateToProps)(MyFood);

