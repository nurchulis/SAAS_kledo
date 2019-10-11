import React from 'react';
import { Modal, Form, Input, Radio, Select } from 'antd';


const { Option } = Select;

const AddRoom = Form.create({ name: 'AddRoom' })(
  class extends React.Component {
    state = {
      confirmLoadingAdd: false,
      confirmLoadingDelete: false,
    };

    render() {
      const { show, showAddTab, roomTypes, confirmLoading, form,
        submitHandler, hideHandler, tabClickHandler
      } = this.props;
      
      const { getFieldDecorator } = form;

      const roomTypesOption = roomTypes.map(item => {
        return <Option value={item.id} key={item.id}>{item.name}</Option>;
      });

      return (
        <Modal
          title="Add Room"
          visible={show}
          onOk={submitHandler}
          confirmLoading={confirmLoading}
          onCancel={hideHandler}
          okText="Add"
        >
          <Form layout='vertical'>
            <Form.Item label="Add">
              <Radio.Group defaultValue="room" onChange={tabClickHandler}>
                <Radio.Button value="room">Room</Radio.Button>
                <Radio.Button value="type">Room Type</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <div className={showAddTab ? 'show' : 'hide'}>
              <Form.Item label="Room name">
                {getFieldDecorator('roomName', {
                rules: [
                  { required: showAddTab, message: 'Please input the room name!' },
                  { max: 20, message: 'Max 20 characters.' },
                  { pattern: /^[\w\s]+$/, message: 'Only alphanumeric allowed.' },
                ],    
              })(
                <Input placeholder="Room name" />
              )}
              </Form.Item>
              <Form.Item label="Room type">
                {getFieldDecorator('roomTypeId', {
                rules: [
                  { required: showAddTab, message: 'Please select a room type to delete' },
                ],    
              })(
                <Select
                  showSearch
                  placeholder="Select room type"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {roomTypesOption}
                </Select>)}
              </Form.Item>
            </div>
            <div className={showAddTab ? 'hide' : 'show'}>
              <Form.Item label="Room type">
                {getFieldDecorator('roomTypeName', {
                rules: [
                  { required: !showAddTab, message: 'Please input the room type label!' },
                  { max: 20, message: 'Room type name is too long. Max 20 characters.' },
                  { pattern: /^[\w\s]+$/, message: 'Only alphanumeric allowed.' },
                ],
              })(
                <Input placeholder="Room type" />
              )}
              </Form.Item>
            </div>
          </Form>
      
        </Modal>
      );
    }
  }
);

export default AddRoom;
