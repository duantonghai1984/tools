import React from 'react';
import { connect } from 'dva';
import styles from './ErrorPage.css';
import MoMainLayout from '../components/MoMainLayout.js'
import { Result, Icon, WhiteSpace } from 'antd-mobile';
function ErrorPage() {
  return (
    <MoMainLayout>
      <Result
        img={<Icon type="cross-circle-o" className={styles.icon} style={{ fill: '#F13642' }} />}
        title="定位失败"
        message="没有桌位号，请重新扫描"
      />
      <WhiteSpace />
    </MoMainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ErrorPage);
