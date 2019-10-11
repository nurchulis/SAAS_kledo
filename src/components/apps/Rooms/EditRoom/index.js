import React from 'react';
import { Modal, Select, Input, Form } from 'antd';

const { Option } = Select;

const EditRoom = Form.create({ name: 'EditRoom' })(
  class extends React.Component {
    componentDidMount() {
      // \\console.log("EditRoom:", this.props);
    }
    
    render() {
      const { room, roomTypes, 
        show, form, confirmLoading,
        hideHandler, submitHandler
      } = this.props;
      const { getFieldDecorator } = form;
      const roomTypesOption = roomTypes.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>);

      if ( room === null )
        return null;

      return (
        <Modal
          title="Edit Room"
          visible={show}
          onOk={submitHandler}
          confirmLoading={confirmLoading}
          onCancel={hideHandler}
          okText="Save"
        >
          <Form layout='vertical'>
            <Form.Item label="Room name">
              {getFieldDecorator('name', {
                initialValue: room.name,
                rules: [
                  { required: true, message: 'Please input the room name!' },
                  { max: 20, message: 'Max 20 characters.' },
                  { pattern: /^[\w\s]+$/, message: 'Only alphanumeric allowed.' },
                ],    
              })(<Input placeholder="Room name" />)}    
            </Form.Item>
            <Form.Item label="Room type">
              {getFieldDecorator('typeId', {
                initialValue: room.type_id,
                rules: [
                  { required: true, message: 'Please select a room type!' },
                ],    
              })(
                <Select
                  showSearch
                  placeholder="Select room type"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >{roomTypesOption}
                </Select>)}
            </Form.Item>
          </Form>
        
        </Modal>
      );
    }
  }
);

export default EditRoom;
