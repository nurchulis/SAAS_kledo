import React from 'react'
import { Drawer, DatePicker, Typography, Switch, InputNumber, Divider, Button } from 'antd';
import moment from 'moment';

const { Text } = Typography;


const { RangePicker } = DatePicker;

const dateFormat = 'ddd, MMM D';

const Filter = (props) => {

  const {show} = props;
  return (
    <div>
      <Drawer
        title="Edit Rates"
        placement="right"
        closable={false}
        // onClose={this.onClose}
        visible={show}
        width={350}
      >
        <Text strong>Selected Dates</Text>
        <div className="bottom-spacing-5" />
        <RangePicker
          defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
          format={dateFormat}
          size="large"
        />

        <div className="bottom-spacing-20" />
        <Text strong>Rate Availability</Text>
        <div className="bottom-spacing-5" />
        <Switch checkedChildren="Available" unCheckedChildren="Unavailable" defaultChecked size="large" />
        <div className="bottom-spacing-20" />
        <Text strong>Nighly Rate</Text>
        <div className="bottom-spacing-5" />
        <InputNumber
          defaultValue={1000}
          formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\Rp\s?|(,*)/g, '')}
          style={{width: '100%'}}
          size="large"
        />
        <Divider />
        <Button type="primary" size="large" style={{marginRight: 10}}>
          Save
        </Button>
        <Button type="danger" size="large" onClick={props.cancelHandler}>
          Cancel
        </Button>
      </Drawer>
    </div>
        );
  };


export default Filter;
