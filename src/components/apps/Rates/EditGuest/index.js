import React from 'react';
import { Modal, Form, Button, Popconfirm } from 'antd';
import EditGuestForm from '../EditGuestForm';



const EditGuest = Form.create({ name: 'EditGuest' })(
  class extends React.Component {
    componentDidUpdate() {
    }
    
    render() {
      const { guest, 
        show, confirmLoading, confirmLoadingDelete,
        hideHandler, submitHandler, deleteSubmitHandler,
      } = this.props;
      

      if ( guest === null )
        return null;

        const styleLeft = {
          float: 'left'
        }
      return (
        <Modal
          title="Edit Guest"
          visible={show}
          onOk={submitHandler}
          confirmLoading={confirmLoading}
          onCancel={hideHandler}
          footer={[
            <Popconfirm
              title="Are you sure delete this guest?"
              onConfirm={deleteSubmitHandler}
              okText="Yes"
              cancelText="No"
              key="pop"
            >
              <Button key="delete" type="danger" loading={confirmLoadingDelete} style={styleLeft}>
                Delete
              </Button>
            </Popconfirm>,
            <Button key="back" onClick={hideHandler}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={confirmLoading} onClick={submitHandler}>
              Save
            </Button>,
          ]}
        >
          <EditGuestForm
            {...this.props}
          />
        </Modal>
      );
    }
  }
);

export default EditGuest;
