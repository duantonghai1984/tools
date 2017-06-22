import React from 'react';
import { connect } from 'dva';
import styles from './ExamplePage.css';
import SiderLayout from '../components/Layout/SiderLayout'
import PgTable from '../components/PgTable'
import { Link } from 'dva/router';
import { Collapse, Modal, Table, Input, Button, Icon } from 'antd';
import QueryWin from '../components/QueryWin'
import { default_date_format,ClusterConst, ajaxUrls } from '../utils/common.js'
const Panel = Collapse.Panel;
import $ from "jquery";
import moment from 'moment'
import {withRouter} from 'react-router'


class ExamplePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }


  render() {
    return (
      <div className={styles.normal}>
        <SiderLayout>
        </SiderLayout>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(withRouter(ExamplePage));
