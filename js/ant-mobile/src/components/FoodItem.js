import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import styles from './FoodItem.css';
import $ from "jquery";
import { NavBar, Card, Icon, Stepper, TabBar, ListView, List, InputItem } from 'antd-mobile';



class FoodItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onStepperChange = (val, rowData) => {
    let action = { good: rowData, count: val };
    this.props.dispatch({ type: 'ShopCard/chooseFood', ...action })
  }

  render() {
    let obj = this.props.rowData;
    if (!obj.count) {
      obj.count = 0;
    }
    return (
      <Card>
        <Card.Body>
          <div style={{ display: '-webkit-box', padding: '0.05rem 0' }}>
            <div className={styles.row_text}>
              <img style={{ height: '1.5rem', marginRight: '0.3rem' }} src={obj.image} alt="icon" />
            </div>
            <div className={styles.row_text}>
              <div style={{ marginBottom: '0.1rem', fontWeight: 'bold', }}>{obj.name}</div>
              <div >
                <List.Item style={{width:"4.2rem",}} extra={<Stepper style={{ width: '100%', minWidth: '1.5rem' }} max={100}
                  min={0} showNumber={true} size="small" defaultValue={obj.count} onChange={(val) => { this.onStepperChange(val, obj); }} />}>
                  <font style={{ fontSize: '0.3rem', color: '#FF6E27', margin: 0, padding: 0 }}>¥{obj.price}</font>
                </List.Item></div>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}


FoodItem.propTypes = {

};

FoodItem.defaultProps = {

}

function mapStateToProps(state) {

  return {};
}

export default connect(mapStateToProps)(FoodItem);
