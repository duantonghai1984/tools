import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import styles from './MoMainLayout.css';
import $ from "jquery";

import { NavBar, Icon,TabBar } from 'antd-mobile';


class MoMainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }



  render() {
    return (
      <div>
      
      </div>
    );
  }
}


MoMainLayout.propTypes = {

};

MoMainLayout.defaultProps = {

}

function mapStateToProps(state) {

  return {};
}

export default connect(mapStateToProps)(MoMainLayout);
