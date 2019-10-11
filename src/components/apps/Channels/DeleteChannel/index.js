import React from 'react';
import { Modal, Button, Form, Select, Popconfirm } from 'antd';
// import DeleteChannelForm from './DeleteChannelForm';

const { Option } = Select;

const DeleteChannel = Form.create({ name: 'DeleteChannel' })(
  class extends React.Component {
    /*
    confirm = (e) => {
      // console.log(e);
      message.success('Click on Yes');
    }
    */

    render() {
      const { show, channels,
        hideHandler, submitHandler,
        confirmLoading,
        form} = this.props;
      const { getFieldDecorator } = form;
      
      const channelsOption = channels.map(item => {
        return <Option key={item.id} value={item.id}>{item.name}</Option>;
      });
      
      return (
        <Modal
          title="Delete Channel"
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
          
            <Form.Item label="Channel">
              {getFieldDecorator('channelId', {
                rules: [
                  { required: true, message: 'Please select a channel to delete' },
                ],    
              })(
                <Select
                  showSearch
                  placeholder="Select channel"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {channelsOption}
                </Select>)}
            </Form.Item>
            
          </Form>
        </Modal>
      );
    }
  }
);

export default DeleteChannel;
