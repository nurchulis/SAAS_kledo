import React from 'react';
import uuid from 'uuid/v4';
import {Button, Card, Checkbox, DatePicker, Icon, Row, Col, Form, Input, Select} from 'antd';

import './style.scss';

class AddBooking extends React.Component {

  state = {
    formData: {
      adults: 1,
      childs: 0,
    }
  };

	updateformData = data => this.setState((prevState) => {
		const {formData} = {...prevState};

		Object.keys(data).forEach((key) => {
			const value = data[key];
			formData[key] = value;
		});
		
		return {formData};
  });
  
  addExtraOnClickHandler = () => {
    const {showAddExtraModal} = this.props;

    showAddExtraModal();
  };

  render() {
    const {show, showBookingListHandler} = this.props;
    const {formData} = this.state;

    const listAdult = [];
    for (let i = 0; i < formData.adults; i += 1) {
      listAdult.push(
        <Row key={uuid()}>
          <Col span={12}><Icon type="user" style={{marginRight: '5px'}} /><span>Adult #{i + 1}</span></Col>
          <Col span={12} style={{display: 'flex', justifyContent: 'flex-end'}}><Button type="link" style={{padding: 0}}>Add details</Button></Col>
        </Row>
      );
    }

    const listChild = [];
    for (let i = 0; i < formData.childs; i += 1) {
      listChild.push(
        <Row key={uuid()}>
          <Col span={12}><Icon type="user" style={{marginRight: '5px'}} /><span>Child #{i + 1}</span></Col>
          <Col span={12} style={{display: 'flex', justifyContent: 'flex-end'}}><Button type="link" style={{padding: 0}}>Add details</Button></Col>
        </Row>
      );
    }

    return (
      <div className="fade-in" style={show && show === true ? {display: 'block'} : {display: 'none'}}>
        <Row>
          <Col span={12}>
            <h2 style={{marginBottom: '30px'}}>New Booking</h2>
          </Col>
          <Col span={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button icon="arrow-left" style={{backgroundColor: '#eb9234', color: '#ffffff'}} onClick={showBookingListHandler}>Back</Button>
          </Col>
        </Row>

        <Row>
          <Col span={16} style={{paddingRight: '20px'}}>
            <Card>
              <Form layout="vertical">
                <Row>
                  <Col span={12} style={{paddingRight: '5px'}}>
                    <Form.Item label="Source">
                      <Select defaultValue="direct">
                        <Select.Option value="direct">Direct</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12} style={{paddingLeft: '5px'}}>
                    <Form.Item label="Reference">
                      <Input placeholder="Reference details ..." />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Button icon="plus">Add a booking note</Button>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <hr noshade="true" />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <h3 style={{marginBottom: '10px'}}>Room Details</h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    <Form.Item label="Check-In">
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item label="Check-Out">
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item label="Nights">
                      <Select defaultValue="1">
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                        <Select.Option value="3">3</Select.Option>
                        <Select.Option value="4">4</Select.Option>
                        <Select.Option value="5">5</Select.Option>
                        <Select.Option value="6">6</Select.Option>
                        <Select.Option value="7">7</Select.Option>
                        <Select.Option value="8">8</Select.Option>
                        <Select.Option value="9">9</Select.Option>
                        <Select.Option value="10">10</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Room">
                      <Select>
                        <Select.Option value="">Other</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Rate">
                      <Select>
                        <Select.Option value="">Other</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Nights & Rate">
                      <Input.Group>
                        <Input style={{width: '20%'}} />
                        <Input style={{width: '15%'}} value="@ Rp. " readOnly />
                        <Input style={{width: '55%'}} />
                        <Button icon="close" style={{width: '10%', color: 'red'}} />
                      </Input.Group>
                      <Button type="link" style={{padding: 0}}>Add another rate</Button>
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{marginBottom: '10px'}}>
                  <Col span={24}>
                    <hr noshade="true" />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <h3 style={{marginBottom: '10px'}}>Extras & Requests</h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Button icon="plus" type="primary" onClick={this.addExtraOnClickHandler}>Add extra</Button>
                  </Col>
                </Row>
                <Row style={{marginBottom: '10px', marginTop: '20px'}}>
                  <Col span={24}>
                    <hr noshade="true" />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <h3 style={{marginBottom: '10px'}}>Guests</h3>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <Form.Item label="Adult">
                      <Select style={{width: '80%'}} defaultValue="1" onChange={value => this.updateformData({adults: value})}>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                        <Select.Option value="3">3</Select.Option>
                        <Select.Option value="4">4</Select.Option>
                        <Select.Option value="5">5</Select.Option>
                        <Select.Option value="6">6</Select.Option>
                        <Select.Option value="7">7</Select.Option>
                        <Select.Option value="8">8</Select.Option>
                        <Select.Option value="9">9</Select.Option>
                        <Select.Option value="10">10</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Child">
                      <Select style={{width: '80%'}} onChange={value => this.updateformData({childs: value})}>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                        <Select.Option value="3">3</Select.Option>
                        <Select.Option value="4">4</Select.Option>
                        <Select.Option value="5">5</Select.Option>
                        <Select.Option value="6">6</Select.Option>
                        <Select.Option value="7">7</Select.Option>
                        <Select.Option value="8">8</Select.Option>
                        <Select.Option value="9">9</Select.Option>
                        <Select.Option value="10">10</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    {listAdult}
                    {listChild}
                  </Col>
                </Row>
                <Row style={{marginBottom: '10px', marginTop: '20px'}}>
                  <Col span={24}>
                    <hr noshade="true" />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Arrival">
                      <Row>
                        <Col span={9} style={{paddingRight: '10px'}}>
                          <Select>
                            <Select.Option value="none">None</Select.Option>
                          </Select>
                        </Col>
                        <Col span={9} style={{paddingRight: '10px'}}>
                          <Input />
                        </Col>
                        <Col span={6} style={{paddingTop: '5px'}}>
                          <Checkbox>Transfer</Checkbox>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Departure">
                      <Row>
                        <Col span={9} style={{paddingRight: '10px'}}>
                          <Select>
                            <Select.Option value="none">None</Select.Option>
                          </Select>
                        </Col>
                        <Col span={9} style={{paddingRight: '10px'}}>
                          <Input />
                        </Col>
                        <Col span={6} style={{paddingTop: '5px'}}>
                          <Checkbox>Transfer</Checkbox>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Row>
                <Col span={24}>
                  <h3 style={{marginBottom: '10px'}}>Booking Summary</h3>
                </Col>
              </Row>
              <Row style={{marginBottom: '10px', marginTop: '20px'}}>
                <Col span={24}>
                  <hr noshade="true" />
                </Col>
              </Row>                
              <Row style={{marginBottom: '10px'}}>
                <Col span={24}>
                  <Button icon="save" style={{backgroundColor: '#72bf58', color: '#ffffff', width: '100%'}}>Save booking</Button>
                </Col>
              </Row>
              <Row style={{marginBottom: '10px'}}>
                <Col span={24}>
                  <Button icon="plus" type="primary" style={{width: '100%'}}>Add another room</Button>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Button icon="save" style={{width: '100%'}}>Save as unconfirmed</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddBooking;
