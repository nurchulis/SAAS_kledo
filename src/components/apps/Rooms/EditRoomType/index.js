import React from 'react';
import { Modal, Form, Input } from 'antd';
import config from 'config';


const EditRoomType = Form.create({ name: 'EditRoomType' })(
  class extends React.Component {
    componentDidMount() {
      // console.log("EditRoomType:", this.props);
    }
    
    render() {
      const { show, roomType, confirmLoading, form,
        hideHandler, submitHandler
      } = this.props;
      const { getFieldDecorator } = form;

      if (roomType === null)
        return null;
        
      return (
        <Modal
          title="Edit Room Type"
          visible={show}
          onOk={submitHandler}
          confirmLoading={confirmLoading}
          onCancel={hideHandler}
          okText="Save"
        >
          <Form layout='vertical'>
            <Form.Item label="Room type">
              {getFieldDecorator('name', {
                initialValue: roomType.name,
                rules: [
                  { required: true, message: 'Please input the room type label!' },
                  { max: config.minimax, message: 'Room type name is too long. Max 20 characters.' },
                  { pattern: /^[\w\s]+$/, message: 'Only alphanumeric allowed.' },
                ],    
              })(<Input placeholder="Room type" />)}    
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default EditRoomType;
