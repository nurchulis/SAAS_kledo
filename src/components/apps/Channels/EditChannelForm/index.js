import React from 'react';
import { Input, Form, Select, Col, Row, InputNumber } from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const InputGroup = Input.Group;



class EditChannelForm extends React.Component {
    render(){
        const { channel, channelTypes, typeChangeHandler,
            commProps, form,
          } = this.props;
          const { getFieldDecorator } = form;
          const channelTypesOption = channelTypes.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>);
          // console.log('EditChannelForm commProps', commProps);
        return (
          <Form layout='vertical'>
            <Form.Item label="Channel name">
              {getFieldDecorator('name', {
                initialValue: channel ? channel.name : null,
                rules: [
                  { required: true, message: 'Please input the channel name!' },
                  { max: 20, message: 'Max 20 characters.' },
                  { pattern: /^[\w\s]+$/, message: 'Only alphanumeric allowed.' },
                ],    
              })(<Input placeholder="Channel name" />)}
            </Form.Item>
            <Form.Item label="Channel type">
              {getFieldDecorator('type_id', {
                initialValue: channel ? channel.type_id : null,
                rules: [
                  { required: true, message: 'Please select a channel type!' },
                ],    
              })(
                <Select
                  showSearch
                  placeholder="Select channel type"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={typeChangeHandler}
                >{channelTypesOption}
                </Select>)}
            </Form.Item>
            <Form.Item label="Contact Details">
              <InputGroup>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item>
                      {getFieldDecorator('first_name', {
                        initialValue: channel ? channel.first_name : null,
                        rules: [
                          { required: false, message: 'Please input the first name!' },
                          { max: 20, message: 'Max 20 characters.' },
                          { pattern: /^[\w\s']+$/, message: 'Only alphanumeric allowed.' },
                        ],    
                      })(<Input placeholder="First name" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      {getFieldDecorator('last_name', {
                        initialValue: channel ? channel.last_name : null,
                        rules: [
                          { required: false, message: 'Please input the last name!' },
                          { max: 20, message: 'Max 20 characters.' },
                          { pattern: /^[\w\s']+$/, message: 'Only alphanumeric allowed.' },
                        ],    
                      })(<Input placeholder="Last name" />)}
                    </Form.Item>
                  </Col>
                </Row>
              </InputGroup>
              <Form.Item>
                {getFieldDecorator('email', {
                  initialValue: channel ? channel.email : null,
                  rules: [
                    { required: false, message: 'Please input the email address!' },
                    { max: 100, message: 'Max 100 characters.' },
                    { type: "email", message: 'Invalid email address format.' },
                  ],    
                })(<Input placeholder="email" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('phone', {
                  initialValue: channel ? channel.phone : null,
                  rules: [
                    { required: false, message: 'Please input the phone number!' },
                    { max: 20, message: 'Max 20 characters.' },
                    { pattern: /^[\d\+]+$/, message: 'Only number allowed.' },
                  ],    
                })(<Input placeholder="phone" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('address', {
                  initialValue: channel ? channel.address : null,
                  rules: [
                    { required: false, message: 'Please input the address!' },
                    { max: 200, message: 'Max 200 characters.' },
                  ],    
                })(<TextArea
                  placeholder="Address"
                  autosize={{ minRows: 2, maxRows: 6 }}
                />)}
              </Form.Item>
              <Form.Item label="Commission">
                {getFieldDecorator('commission', {
                  initialValue: channel ? channel.commission : null,
                  rules: [
                    { required: commProps.required, message: 'Please input the commission!' },
                    { pattern: commProps.required ? /^[\d\.]+$/ : /./, message: 'Only number allowed.' },
                  ],    
                })(<InputNumber {...commProps} min={0} style={{ width: 60 }} placeholder="Commission" />)}
              </Form.Item>
              <Form.Item label="Internal note">
                {getFieldDecorator('note', {
                  initialValue: channel ? channel.note : null,
                  rules: [
                    { required: false, message: 'Please input the internal name!' },
                    { max: 400, message: 'Max 400 characters.' },
                  ],    
                })(<TextArea
                  placeholder="Internal note"
                  autosize={{ minRows: 2, maxRows: 6 }}
                />)}
              </Form.Item>
            </Form.Item>
            
          </Form>
        
        );
    }
}

export default EditChannelForm;
