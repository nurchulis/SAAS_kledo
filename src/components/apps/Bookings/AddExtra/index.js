import React from 'react';
import {Form, Input, Modal, Select} from 'antd';
import uuid from 'uuid/v4';

const AddExtra = Form.create({name: 'addExtra'}) (
  class extends React.Component {
    state = {
      extras: null,
      formData: {
        extraId: '',
        price: '0',
        quantity: '0'
      }
    };

    updateFormData = data => this.setState((prevState) => {
      const {formData} = {...prevState};

      Object.keys(data).forEach((key) => {
        const value = data[key];
        formData[key] = value;
      });
      
      return {formData};
    });

    extraOnChangeHandler = (val) => this.setState((prevState) => {
      const {extras} = this.props;
      const {formData} = {...prevState};

      const filteredExtras = extras.filter(extra => extra.id === val);
      if (filteredExtras && filteredExtras.length > 0) {
        formData.price = filteredExtras[0].price;
      }

      return {formData};
    }, () => {
      this.updateFormData({extraID: val});
    });

    render() {
      const {extras, form: {getFieldDecorator}, show, onOkHandler, confirmLoading, onCancelHandler} = this.props;
      const {formData} = this.state;

      const extraOptions = extras && extras.length > 0 ? extras.map((extra) => {
        return <Select.Option key={uuid()} value={extra.id}>{extra.name}</Select.Option>;
      }) : '';

      return (
        <Modal
          title="Add Extra"
          visible={show}
          onOk={onOkHandler}
          confirmLoading={confirmLoading}
          onCancel={onCancelHandler}
          okText="Add"
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('extraId', {
                rules: [{ required: true, message: 'Please select extra!' }],
              })(
                <Select
                  placeholder="Select extra"
                  onChange={this.extraOnChangeHandler}
                >
                  <Select.Option value="none">-- Select Extra --</Select.Option>
                  {extraOptions}
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('price', {
                rules: [{ required: true, message: 'Please input price!' }],
                setFieldsValue: formData.price
              })(
                <Input
                  type="number"
                  placeholder="Price"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('quantity', {
                rules: [{ required: true, message: 'Please input quantity!' }],
                setFieldsValue: formData.quantity
              })(
                <Input
                  type="number"
                  placeholder="Quantity"
                />,
              )}
            </Form.Item>
          </Form>        
        </Modal>
      );
    }
  }
);

export default AddExtra;
