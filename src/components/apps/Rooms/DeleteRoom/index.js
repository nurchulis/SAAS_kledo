import React from 'react';
import { Modal, Button, Form, Radio, Select, Popconfirm } from 'antd';
// import DeleteRoomForm from './DeleteRoomForm';

const { Option } = Select;

const DeleteRoom = Form.create({ name: 'DeleteRoom' })(
  class extends React.Component {
    /*
    confirm = (e) => {
      // console.log(e);
      message.success('Click on Yes');
    }
    */

    render() {
      const { show, rooms, roomTypes,
        hideHandler, showDeleteTab, tabClickHandler, submitHandler,
        confirmLoading,
        form} = this.props;
      const { getFieldDecorator } = form;
      
      const roomsOption = rooms.map(item => {
        return <Option key={item.id} value={item.id}>{item.name}</Option>;
      });
      const roomTypesOption = roomTypes.map(item => {
        return <Option key={item.id} value={item.id}>{item.name}</Option>;
      });
      
      return (
        <Modal
          title="Delete Room"
          visible={show}
          onOk={submitHandler}
          confirmLoading={confirmLoading}
          onCancel={hideHandler}
          footer={[
            <Button key="back" onClick={hideHandler}>
                Cancel
            </Button>,
            <Popconfirm
              title="Are you sure delete?"
              onConfirm={submitHandler}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
              key="pop"
            >
              <Button key="submit" type="primary" loading={confirmLoading}>
                Delete
              </Button>
            </Popconfirm>,
               ]}
        >
          <Form layout='vertical'>
            <Form.Item label="Delete">
              <Radio.Group defaultValue="room" onChange={tabClickHandler}>
                <Radio.Button value="room">Room</Radio.Button>
                <Radio.Button value="type">Room Type</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <div className={showDeleteTab ? 'show' : 'hide'}>
              <Form.Item label="Room">
                {getFieldDecorator('roomId', {
                rules: [
                  { required: showDeleteTab, message: 'Please select a room to delete' },
                ],    
              })(
                <Select
                  showSearch
                  placeholder="Select room"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {roomsOption}
                </Select>)}
              </Form.Item>
            </div>
            <div className={showDeleteTab ? 'hide' : 'show'}>
              <Form.Item label="Room type">
                {getFieldDecorator('roomTypeId', {
                rules: [
                  { required: !showDeleteTab, message: 'Please select a room type to delete' },
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
          </Form>
        </Modal>
      );
    }
  }
);

export default DeleteRoom;
