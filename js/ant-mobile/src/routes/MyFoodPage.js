import React from 'react';
import { connect } from 'dva';
import styles from './MyFoodPage.css';
import MoMainLayout from '../components/MoMainLayout.js'
import MyFood from '../components/MyFood.js'
import MyOrder from '../components/MyOrder.js'
import {Tabs,  WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types'
const TabPane = Tabs.TabPane;


class MyFoodPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <MoMainLayout>
        <Tabs defaultActiveKey="1">
          <TabPane tab="未提交订单" key="1">
              <MyFood />
          </TabPane>
          <TabPane tab="已提交订单" key="2">
              <MyOrder />
          </TabPane>
        </Tabs>

        <WhiteSpace />
      </MoMainLayout>
    );
  }

}


MyFoodPage.propTypes = {

};

MyFoodPage.defaultProps = {

}

function mapStateToProps(state) {
  const { ShopCard } = state
  return { ShopCard };
}

export default connect(mapStateToProps)(MyFoodPage);

