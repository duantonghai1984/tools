import React from 'react';
import { connect } from 'dva';
import styles from './MoIndexPage.css';
import MoMainLayout from '../components/MoMainLayout.js'
import ChooseFood from '../components/ChooseFood.js'
import { Result, Icon, WhiteSpace } from 'antd-mobile';



class MoIndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
     if (this.checkInitInfo()) {
      let { shopId, deskId } = this.props.location.query;
      let action = { shopId: shopId, deskId: deskId, };
      this.props.dispatch({ type: 'ShopCard/enterShop', ...action })   
    }
  }

  checkInitInfo = () => {
    let { shopId, deskId } = this.props.location.query;
    if (!shopId || !deskId) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    let node = null;
    if (this.checkInitInfo()) {
      node = <ChooseFood />
    } else {
      node = 
        <Result
          img={<Icon type="cross-circle-o" className={styles.icon} style={{ fill: '#F13642' }} />}
          title="定位失败"
          message="没有桌位号，请重新扫描"
        />
    }

    return (
      <MoMainLayout>
        {node}
        <WhiteSpace />
      </MoMainLayout>
    );
  }

}


MoIndexPage.propTypes = {

};

MoIndexPage.defaultProps = {

}

function mapStateToProps(state) {
  const { ShopCard } = state
  return { ShopCard };
}

export default connect(mapStateToProps)(MoIndexPage);
