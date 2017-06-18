import React from 'react';
import { connect } from 'dva';
import styles from './MyFoodPage.css';
import MoMainLayout from '../components/MoMainLayout.js'
import MyFood from '../components/MyFood.js'
import {WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types'



class MyFoodPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

 
  render() {
    return (
      <MoMainLayout>
        <MyFood />
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
  const {ShopCard}=state
  return {ShopCard};
}

export default connect(mapStateToProps)(MyFoodPage);

