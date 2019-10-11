import React from 'react';
import { Modal, Form } from 'antd';
import EditGuestForm from '../EditGuestForm';



const AddGuest = Form.create({ name: 'AddGuest' })(
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
          title="Add Guest"
          visible={show}
          onOk={submitHandler}
          confirmLoading={confirmLoading}
          onCancel={hideHandler}
          okText="Add"
        >
          <EditGuestForm
            {...this.props}
          />
        </Modal>
      );
    }
  }
);

export default AddGuest;
