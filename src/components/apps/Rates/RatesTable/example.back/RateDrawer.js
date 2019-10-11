import React from 'react'
import { Drawer } from 'antd';
import css from "./style.module.css";


const Filter = () => {

  return (
    <div>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          // onClose={this.onClose}
          visible
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
        );
  };


export default Filter;
