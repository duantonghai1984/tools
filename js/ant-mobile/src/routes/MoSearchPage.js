
import styles from './MoSearchPage.css';
import React from 'react';
import { connect } from 'dva';
import MoMainLayout from '../components/MoMainLayout.js'
import { Result, Icon, SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';

import FoodList from '../components/FoodList.js'
import $ from "jquery";
import { ajaxUrls } from '../utils/common.js';


class MoSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodName: ''
    };
  }


  onSearch = (value) => {
    if (value.length > 1) {
      console.log('log2', value)
      this.setState({
        foodName: value
      });
    }
  }

  render() {

    const { shopId } = this.props.ShopCard;
    return (
      <MoMainLayout>
        <SearchBar
          placeholder="搜索"

          onCancel={() => console.log('onCancel')}
          onSubmit={this.onSearch.bind(this)}
          showCancelButton
        />

        <div style={{ display: 'flex', alignItems: 'top', justifyContent: 'center', height: '25rem', backgroundColor: '#fff' }}>
          <FoodList foodName={this.state.foodName} shopId={shopId} />
        </div>
        <WhiteSpace />
      </MoMainLayout>
    );
  }

}


MoSearchPage.propTypes = {

};

MoSearchPage.defaultProps = {

}

function mapStateToProps(state) {
  const { ShopCard } = state
  return { ShopCard };
}

export default connect(mapStateToProps)(MoSearchPage);

