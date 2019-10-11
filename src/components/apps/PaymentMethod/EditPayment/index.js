import React from 'react';
import { Modal, Form } from 'antd';
import EditChannelForm from '../EditChannelForm';



const EditChannel = Form.create({ name: 'EditChannel' })(
  class extends React.Component {
    componentDidUpdate() {
      if(this.props.channel !== null && this.props.commProps === null)
       this.props.typeChangeHandler(this.props.channel.type_id);
      
    }
    
    render() {
      const { channel, 
        show, confirmLoading,
        hideHandler, submitHandler, 
      } = this.props;
      

      if ( channel === null )
        return null;

      return (
        <Modal
          title="Edit Channel"
          visible={show}
          onOk={submitHandler}
          confirmLoading={confirmLoading}
          onCancel={hideHandler}
          okText="Save"
        >
          <EditChannelForm
            {...this.props}
          />
        </Modal>
      );
    }
  }
);

export default EditChannel;
