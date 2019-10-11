import React from 'react';
import { Modal, Form } from 'antd';
import EditChannelForm from '../EditChannelForm';



const AddChannel = Form.create({ name: 'AddChannel' })(
  class extends React.Component {
    componentDidMount() {
      console.log(this.props.commProps);
    }
    
    render() {
      const { 
        show, confirmLoading,
        hideHandler, submitHandler, 
      } = this.props;

      return (
        <Modal
          title="Add Channel"
          visible={show}
          onOk={submitHandler}
          confirmLoading={confirmLoading}
          onCancel={hideHandler}
          okText="Add"
        >
          <EditChannelForm
            {...this.props}
          />
        </Modal>
      );
    }
  }
);

export default AddChannel;
