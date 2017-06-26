import React from 'react';
import styles from './QueryWin.css';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import { DatePicker, Select, Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import RemoteSelect from '../components/RemoteSelect'
import $ from "jquery";



class QueryWin extends React.Component {
  constructor(props) { // 初始化的工作放入到构造函数
    super(props); // 在 es6 中如果有父类，必须有 super 的调用用以初始化父类信息
    this.state = {
      expand: false,
      selectData: {},
      selectOptions: {},
    };

    this.init();
  }

  getNullOption = () => {
    return [<Option key="" value="" title="" ></Option>]
  }

  init = () => {

    let selectOpts = this.state.selectOptions;
    this.props.columns.forEach(function (value) {
      if (value.type && value.type == 'select') {
        selectOpts[value.id] = value;
      }
    });

    let selectData = this.state.selectData;

    for (let idx in this.state.selectOptions) {
      let value = this.state.selectOptions[idx];
      if (value.options.url && value.options.url.length > 3) {
        this.fetchRemoteData(value.options.url, '', true, value.id,value.options.queryData)
      }

      if (value.options.data && value.options.data.length > 0) {
        selectData[value.id] = value.options.data.map(d => <Option key={String(d.value)} value={String(d.value)} title={String(d.value)}>{d.text}</Option>);
        if (undefined == value.required || !value.required) {
          selectData[value.id] = this.getNullOption().concat(selectData[value.id]);
        }
      }
    }

    this.setState({ selectOptions: selectOpts, selectData: selectData });
  }

  componentDidMount() {
    if (this.props.callBack) {
      this.props.callBack(this.props.form);
    }

  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (this.props.submitData) {
        this.props.submitData(err, values);
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }


  fetchRemoteData = (url = '', queryStr = '', force = false, key = '',queryData={}) => {
    /*
    if (key.length < 1  || url.length < 2) {
      return;
    }
    
  
    if (value.length < 3 && !force) {
      return;
    }
    */

    let furl = url + "?queryStr=" + queryStr;
    let value = this.state.selectOptions[key];
    $.get(furl,queryData, (result) => {
      const data = [];
      result.resultList.forEach((r) => {
        data.push({
          value: r[value.options.valueFiled],
          text: r[value.options.textFiled],
        });
      });
      let selectData = this.state.selectData;
      selectData[key] = data.map(d => <Option value={String(d.value)} title={String(d.text)}>{d.text}</Option>);
      
      if (undefined == value.required || !value.required) {
        selectData[key] = this.getNullOption().concat(selectData[key]);
      }
      this.setState({ selectData: selectData });
    });
  }


  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const clsProps = this.props;
    const selectData = this.state.selectData;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };




    // To generate mock Form.Item
    const children = [];
    this.props.columns.forEach(function (value) {
      let node;
      let disable = false;
      if (value && value.disable) {
        disable = value.disable;
      }

      if (value.type && value.type == 'date') {
        if (disable) {
          node =
            getFieldDecorator(value.id, { rules: [{ required: value.required, message: value.errTip }], })
              (<DatePicker disabled {...value.options} style={{ width: value.width }} />)

        } else {
          node =
            getFieldDecorator(value.id, { rules: [{ required: value.required, message: value.errTip }], })
              (<DatePicker  {...value.options} style={{ width: value.width }} />)

        }


      } else if (value.type && value.type == 'textarea') {
        let minRows = value.minRows;
        if (!minRows) {
          minRows = 2;
        }

        let maxRows = value.maxRows;
        if (!maxRows) {
          maxRows = 6;
        }
        if (disable) {
          node = getFieldDecorator(value.id, { rules: [{ required: value.required, message: value.errTip }], })(
            <Input disabled type="textarea" placeholder={value.placeholder} style={{ width: value.width }} autosize={{ minRows: minRows, maxRows: maxRows }} />
          )
        } else {
          node = getFieldDecorator(value.id, { rules: [{ required: value.required, message: value.errTip }], })(
            <Input type="textarea" placeholder={value.placeholder} style={{ width: value.width }} autosize={{ minRows: minRows, maxRows: maxRows }} />
          )
        }

      } else if (value.type && value.type == 'select') {
        let opts = [];
        try {
          opts = selectData[value.id];
        } catch (err) {
          console.log(err)
        }

        let useLabelInValue = true;
        if (value.options.mode) {
          if (value.options.mode == 'multiple' || value.options.mode == 'tags') {
            useLabelInValue = false;
          }
        }
        if (disable) {
          node = getFieldDecorator(value.id, { rules: [{ required: value.required, message: value.errTip }], })(
            <Select disabled style={{ width: value.width }} labelInValue={useLabelInValue} mode={value.options.mode}>
              {opts}
            </Select >
          )
        }else{
          node = getFieldDecorator(value.id, { rules: [{ required: value.required, message: value.errTip }], })(
          <Select style={{ width: value.width }} labelInValue={useLabelInValue} mode={value.options.mode}>
            {opts}
          </Select >
          )
        }
      } else {
        if (disable) {
          node = getFieldDecorator(value.id, { rules: [{ required: value.required, message: value.errTip }], })(
            <Input disabled type={value.type} placeholder={value.placeholder} style={{ width: value.width }} />
          )
        } else {
          node = getFieldDecorator(value.id, { rules: [{ required: value.required, message: value.errTip }], })(
            <Input type={value.type} placeholder={value.placeholder} style={{ width: value.width }} />
          )
        }
      }

      children.push(
        <Col span={clsProps.spanWidth} >
          <FormItem {...formItemLayout} label={value.label}>
            {
              node
            }
          </FormItem>
        </Col>
      );

    });

    const expand = this.state.expand;
    const shownCount = expand ? children.length : this.props.maxDisplayNum;

    let expandNode;
    if (this.props.maxDisplayNum < children.length) {
      expandNode = <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>展开 <Icon type={expand ? 'up' : 'down'} /></a>
    }

    let btnBlock;
    if (this.props.needButton) {
      btnBlock = <Col span={24} style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit">保存</Button>
        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
        {expandNode}
      </Col>
    } else {
      btnBlock = <Col span={24} style={{ textAlign: 'right' }}>
        {expandNode}
      </Col>
    }

    
    return (
      <Form
        style={{...this.props.formStyle}}  
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          {children.slice(0, shownCount)}
        </Row>
        <Row>
          {btnBlock}
        </Row>
      </Form>
    );
  }
}


QueryWin.propTypes = {
  submitData: PropTypes.func,
  callBack: PropTypes.func,
  columns: PropTypes.array,
  spanWidth: PropTypes.string,
  needButton: PropTypes.bool,
};

QueryWin.defaultProps = {
  needButton: true,
  maxDisplayNum: 6,
  formStyle: {
    /*
  padding: "24px",
  background: "#fbfbfb",
  border: "1px solid #d9d9d9",
  "border-radius": "6px",
  */
}
}


export default Form.create()(QueryWin)
//export default connect()(Form.create()(SearchPanel));

