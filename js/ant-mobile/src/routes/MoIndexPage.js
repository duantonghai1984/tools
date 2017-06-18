import React from 'react';
import { connect } from 'dva';
import styles from './MoIndexPage.css';
import MoMainLayout from '../components/MoMainLayout.js'
import ChooseFood from '../components/ChooseFood.js'
import { Result, Icon, WhiteSpace } from 'antd-mobile';
import { ajaxUrls, submitedOrder,SessionUtil } from '../utils/common.js';
import {withRouter} from 'react-router'


class MoIndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
     if (SessionUtil.validSessionIfo(this.props,this.props.ShopCard)) {
      let { shopId, deskId } = this.props.location.query;
      let action = { shopId: shopId, deskId: deskId, };
      this.props.dispatch({ type: 'ShopCard/enterShop', ...action })   
    }
  }


  render() {
    if(!SessionUtil.validSessionIfo(this.props,this.props.ShopCard)){
          this.props.router.push(`/ErrorPage`);
    }

    return (
      <MoMainLayout>
        <ChooseFood />
        <WhiteSpace />
      </MoMainLayout>
    );
  }

}


function mapStateToProps(state) {
  const { ShopCard } = state
  return { ShopCard };
}

export default connect(mapStateToProps)(withRouter(MoIndexPage));
