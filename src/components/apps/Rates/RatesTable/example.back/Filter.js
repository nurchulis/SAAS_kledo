import React from 'react'
import { Select, Row, Col } from 'antd';
import css from "./style.module.css";

const { Option } = Select;

const Filter = () => {

  return (
    <Row className={css.filterBox}>
      
      <Col span={12}>
        <span className={css.filterInput}>
          <Select defaultValue="lucy" size="large">
            <Option value="jack">Super Deluxe</Option>
            <Option value="lucy">Super Deluxe w/ breakfast</Option>
          </Select>
        </span>
        <span className={css.filterInput}>
          <Select defaultValue="lucy" size="large">
            <Option value="jack">Standard</Option>
            <Option value="lucy">Promo Internet</Option>
          </Select>
        </span>
      </Col>
      <Col span={12} className={css.right}>
        <span className={css.filterInput}>
          <Select defaultValue="lucy" size="large">
            <Option value="jack">January</Option>
            <Option value="lucy">February</Option>
          </Select>
        </span>
        <span className={css.filterInput}>

          <Select defaultValue="lucy" size="large">
            <Option value="jack">2019</Option>
            <Option value="lucy">2020</Option>
          </Select>
        </span>
        
      </Col>
    </Row>
        );
  };


export default Filter;
