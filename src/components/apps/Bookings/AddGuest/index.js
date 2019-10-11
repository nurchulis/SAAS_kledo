import React from 'react';
import {Modal} from 'antd';

class AddBuest extends React.Component {

  render() {
    const {show} = this.props;

    return (
      <Modal
        title="Add Geust"
        visible={show}
      >
        <h1>Add Guest</h1>
      </Modal>
    );
  }
}

export default AddBuest;
