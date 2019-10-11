import React from 'react'
import classNames from 'classnames'
import styles from './style.module.scss'

const Loader = (props, { spinning = true, fullScreen }) => (
  <div
    className={classNames(styles.loader, {
      [styles.hidden]: !spinning,
      [styles.fullScreen]: fullScreen,
    })}
  >{props.children}
  </div>
)

export default Loader;
