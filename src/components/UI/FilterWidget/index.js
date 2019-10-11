import React from 'react';
import {Form, Checkbox, DatePicker, Select} from 'antd';
import moment from 'moment';
import uuid from 'uuid/v4';

import './style.css';

const {RangePicker} = DatePicker
const {Option} = Select;
const dateFormat = 'MM/DD/YYYY';

class FilterWidget extends React.Component {
  state = {
    filter: {
      bookingStatusIds: null,
      dates: null,
      channelId: null
    }
  };

  statusOnChange = (checkedValues) => {
    const {onChange} = this.props;

    this.setState((prevState) => {
      const {filter} = prevState;

      filter.bookingStatusIds = checkedValues;

      return filter;
    }, () => {      
      onChange(this.state.filter);
    });      
  };

  dateOnChange = (dates) => {
    const {onChange} = this.props;

    this.setState((prevState) => {
      const {filter} = prevState;

      filter.dates = dates;

      return filter;
    }, () => {      
      onChange(this.state.filter);
    });
  };

  channelOnChange = (selectedValue) => {
    const {onChange} = this.props;

    this.setState((prevState) => {
      const {filter} = prevState;

      filter.channelId = selectedValue;

      return filter;
    }, () => {      
      onChange(this.state.filter);
    });
  };

  render() {
    const {channels, bookingStatuses} = this.props;

    const statusOptions = bookingStatuses ? bookingStatuses.map((bookingStatus) => {
      return {
        label: bookingStatus.name,
        value: bookingStatus.id
      };
    }) : [];

    const channelOptions = channels ? channels.map((channel) => {
      return <Option key={uuid()} value={channel.id}>{channel.name}</Option>
    }) : [];

    return (
      <Form>
        <Form.Item label="Status">
          <Checkbox.Group options={statusOptions} onChange={this.statusOnChange} />
        </Form.Item>
        <Form.Item label="Date">
          <RangePicker format={dateFormat} defaultValue={[moment(), moment()]} onChange={this.dateOnChange} />
        </Form.Item>
        <Form.Item label="Channel">
          <Select defaultValue="all" onChange={this.channelOnChange}>
            <Option value="all">All channels</Option>
            {channelOptions}
          </Select>
        </Form.Item>
      </Form>
    );
  }
};

export default FilterWidget;
