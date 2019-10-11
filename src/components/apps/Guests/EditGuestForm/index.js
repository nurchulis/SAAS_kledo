import React from 'react';
import { Input, Form, Select, Col, Row, InputNumber, Checkbox } from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const InputGroup = Input.Group;



class EditGuestForm extends React.Component {
  componentDidUpdate(){
    console.log("componentDidUpdate childChecked", this.props.childChecked);
  }

    render(){
        const { guest, countries, bookingTypes,
            form,
            childChangeHandler, childChecked
          } = this.props;
          const { getFieldDecorator } = form;
          const countriesOption = countries.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>);
          const bookingTypesOption = bookingTypes.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>);

          const displayContactDetails = (
            <Form.Item label="Contact details">
              <InputGroup>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item>
                      {getFieldDecorator('phone', {
                  initialValue: guest ? guest.phone : null,
                  rules: [
                    { required: false, message: 'Please input the phone number!' },
                    { max: 20, message: 'Max 20 characters.' },
                    { pattern: /^[\d\+]+$/, message: 'Only number allowed.' },
                  ],    
                })(<Input placeholder="phone" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      {getFieldDecorator('email', {
                  initialValue: guest ? guest.email : null,
                  rules: [
                    { required: false, message: 'Please input the email address!' },
                    { max: 100, message: 'Max 100 characters.' },
                    { type: "email", message: 'Invalid email address format.' },
                  ],    
                })(<Input placeholder="email" />)}
                    </Form.Item>
                  </Col>
                </Row>
              </InputGroup>
              <Form.Item>
                {getFieldDecorator('address', {
                  initialValue: guest ? guest.address : null,
                  rules: [
                    { required: false, message: 'Please input the address!' },
                    { max: 200, message: 'Max 200 characters.' },
                  ],    
                })(<TextArea
                  placeholder="Address"
                  autosize={{ minRows: 2, maxRows: 6 }}
                />)}
              </Form.Item>
              <Form.Item label="Country">
                {getFieldDecorator('country_id', {
                initialValue: guest ? guest.country_id : null,
                rules: [
                  { required: false, message: 'Please select a country!' },
                ],    
              })(
                <Select
                  showSearch
                  placeholder="Select country"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >{countriesOption}
                </Select>)}
              </Form.Item>
            </Form.Item>
          );
          
          const displayAge  = (
            <Form.Item label="Age">
              {getFieldDecorator('age', {
                initialValue: guest ? guest.age : null,
                rules: [
                  { required: false, message: 'Please input the age!' },
                  { pattern: /^[\d]+$/, message: 'Only number allowed.' },
                ],    
              })(<InputNumber placeholder="age" max={20} min={0} />)}
            </Form.Item>);
          
          const displayContact = childChecked ? null : displayContactDetails;
          const displayAgeTag = childChecked ? displayAge : null;

        return (
          <Form layout='vertical' hideRequiredMark>
            <Form.Item label="Name">
              <InputGroup>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item>
                      {getFieldDecorator('first_name', {
                        initialValue: guest ? guest.first_name : null,
                        rules: [
                          { required: true, message: 'Please input the first name!' },
                          { max: 20, message: 'Max 20 characters.' },
                          { pattern: /^[\w\s']+$/, message: 'Only alphanumeric allowed.' },
                        ],    
                      })(<Input placeholder="First name" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      {getFieldDecorator('last_name', {
                        initialValue: guest ? guest.last_name : null,
                        rules: [
                          { required: true, message: 'Please input the last name!' },
                          { max: 20, message: 'Max 20 characters.' },
                          { pattern: /^[\w\s']+$/, message: 'Only alphanumeric allowed.' },
                        ],
                      })(<Input placeholder="Last name" />)}
                    </Form.Item>
                  </Col>
                </Row>
              </InputGroup>
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('is_child', {})(
                <Checkbox
                  checked={childChecked}
                  onChange={childChangeHandler}
                >Child
                </Checkbox>)}
            </Form.Item>
            
            {displayAgeTag}

            <Form.Item label="Booking type">
              {getFieldDecorator('booking_type_id', {
                initialValue: guest ? guest.booking_type_id : 1,
                rules: [
                  { required: true, message: 'Please select a booking type!' },
                ],
              })(
                <Select
                  showSearch
                  placeholder="Select booking type"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >{bookingTypesOption}
                </Select>)}
            </Form.Item>
            { displayContact }
            <Form.Item label="Internal note">
              {getFieldDecorator('note', {
                  initialValue: guest ? guest.note : null,
                  rules: [
                    { required: false, message: 'Please input the internal note!' },
                    { max: 400, message: 'Max 400 characters.' },
                  ],    
                })(<TextArea
                  placeholder="Internal note"
                  autosize={{ minRows: 2, maxRows: 6 }}
                />)}
            </Form.Item>
            
            
          </Form>
        
        );
    }
}

export default EditGuestForm;
