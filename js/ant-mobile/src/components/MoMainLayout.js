import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import styles from './MoMainLayout.css';
import $ from "jquery";
import {withRouter} from 'react-router'
import {ajaxUrls} from '../utils/common.js';
import { NavBar, Icon,TabBar } from 'antd-mobile';


class MoMainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      money:{count:0,amount:0}
    };
  }

componentDidMount() {
      this.refreshData();
  }

 refreshData = () => {
   let url=ajaxUrls.shopDet+"?shopId="+this.props.ShopCard.shopId

   try{
    $.get(url, (result) => {
       let action = {shop:result };
       this.props.dispatch({ type: 'ShopCard/updateShop', ...action })
    });
   }catch(err){
     console.log(err);
   }
  }

 onLeftClick=()=>{

 }

 goSearch=()=>{
   const {shopId,deskId,shop}=this.props.ShopCard;
    this.props.router.push(`/MoSearchPage?shopId=${shopId}&deskId=${deskId}`);
 }


  render() {
    let shopCardInfo=this.props.ShopCard.total.foodCount+'份 ￥'+this.props.ShopCard.total.amount
    const {shopId,deskId,shop}=this.props.ShopCard;
    return (
      <div>
        <NavBar leftContent="back"
          mode="light"
          onLeftClick={() => this.onLeftClick.bind(this)}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} onClick={this.goSearch.bind(this)}/>,
          ]}
        >{shop.shopName}</NavBar>
        {this.props.children}

        <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          title={shopCardInfo}
          key={shopCardInfo}
          icon={<div style={{
            width: '0rem',
            height: '0rem',}}
          />
          }
          selectedIcon={<div style={{
            width: '0rem',
            height: '0rem', }}
          />
          }
          selected={this.state.selectedTab === 'blueTab'}
         
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}
        >
        
        </TabBar.Item>


        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="主页"
          key="主页"
          selected={this.state.selectedTab === 'homeTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'homeTab',
            });
            this.props.router.push(`/home?shopId=${shopId}&deskId=${deskId}`); 
          }}
        >
          
        </TabBar.Item>

      
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="我的"
          key="我的"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'yellowTab',
            });
            this.props.router.push('/MyFoodPage');
          }}
        >
          
        </TabBar.Item>
      </TabBar>
      </div>
    );
  }
}


MoMainLayout.propTypes = {

};

MoMainLayout.defaultProps = {

}


function mapStateToProps(state) {
  const {ShopCard}=state
  return {ShopCard};
}


export default connect(mapStateToProps)(withRouter(MoMainLayout));
