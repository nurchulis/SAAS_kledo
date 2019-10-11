import React from 'react';
import classNames from 'classnames';
import { Spin } from 'antd';
import styles from './style.module.css';

const Spinner = ({ spinning = true }) => (
  <Spin
    className={classNames(styles.loader, {
      [styles.hidden]: !spinning
    })}
  />
)

export default Spinner;
