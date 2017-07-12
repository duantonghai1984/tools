import React from 'react';
import { connect } from 'dva';
import styles from './CluserUpdatePage.css';

function CluserUpdatePage() {
  return (
    <div className={styles.normal}>
      Route Component: CluserUpdatePage
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(CluserUpdatePage);
