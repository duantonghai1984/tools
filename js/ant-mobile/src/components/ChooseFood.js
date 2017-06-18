
import styles from './ChooseFood.css';
import React from 'react';
import { connect } from 'dva';
import MoMainLayout from '../components/MoMainLayout.js'
import FoodList from '../components/FoodList.js'
import { Tabs, WhiteSpace } from 'antd-mobile';
const TabPane = Tabs.TabPane;
import $ from "jquery";
import {ajaxUrls} from '../utils/common.js';

const makeTabPane =(data,idx) => (
  <TabPane tab={`${data.name}`} key={idx}>
    <div style={{ display: 'flex', alignItems: 'top', justifyContent: 'center', height: '25rem', backgroundColor: '#fff' }}>
      <FoodList  catogryId={data.id}  shopId={data.shopId} />
    </div>
  </TabPane>
);

class ChooseFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        foodCatogry:[],
    };
  }

 componentDidMount() {
      this.refreshData();
  }

 refreshData = () => {
   let url=ajaxUrls.catogryList+"?shopId="+this.props.ShopCard.shopId
    $.get(url, (result) => {
      this.setState({foodCatogry:result})
    });
  }
 
  render() {
    const {foodCatogry}=this.state;
    let tabChild=[];
    for(let idx in foodCatogry){
      tabChild.push(makeTabPane(foodCatogry[idx],idx));
    }
    return (
        <Tabs defaultActiveKey="0"  pageSize={4}>
          {tabChild}
        </Tabs>
    );
  }
  
}


ChooseFood.propTypes = {

};

ChooseFood.defaultProps = {

}

function mapStateToProps(state) {
  const {ShopCard}=state
  return {ShopCard};
}

export default connect(mapStateToProps)(ChooseFood);
