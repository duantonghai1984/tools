
import styles from './FoodList.css';
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import $ from "jquery";
import { NavBar, Card, Icon, Stepper, TabBar, ListView, List, InputItem } from 'antd-mobile';
import { ajaxUrls } from '../utils/common.js';
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


class FoodList extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }


  componentDidMount() {
    this.refreshData();
    
  }

  componentWillReceiveProps(newProps) {
    if (newProps.foodName  && newProps.foodName.length > 1) {
        this.refreshData(newProps.foodName);
    }
  }

  refreshData = (foodName) => {
    let order = { catogryid: this.props.catogryId, pName: foodName,shopid:this.props.ShopCard.shopId };
    $.post({
      url: ajaxUrls.foodList, 
      data: JSON.stringify(order), 
      type: "post",
      dataType: "json",
      contentType: "application/json",
    }, (result) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(result),
      });
    });
  }

  onEndReached = (event) => {

  }

  onStepperChange = (val, rowData) => {
    let action = { good: rowData, count: val };
    this.props.dispatch({ type: 'ShopCard/chooseFood', ...action })
  }


  row = (rowData, sectionID, rowID) => {
    let obj = rowData;
    return (
      <div key={rowID} className={styles.row}>
        <FoodItem rowData={rowData} />
      </div>
    );
  };

  render() {
    return (
      <div style={{ margin: '0 0', width: '98%' }}>
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={() => <span>菜单</span>}
          renderRow={this.row.bind(this)}
          renderBodyComponent={() => <MyBody />}

          className="fortest"
          style={{
            height: document.documentElement.clientHeight * 9 / 10,
            overflow: 'auto',
            border: '1px solid #ddd',
            margin: '0.2rem 0',
          }}
          pageSize={4}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll'); }}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}


FoodList.propTypes = {

};

FoodList.defaultProps = {

}

function mapStateToProps(state) {
  const { ShopCard } = state
  return { ShopCard };
}

export default connect(mapStateToProps)(FoodList);

