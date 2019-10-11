import React, { Component } from 'react'
import { node } from 'prop-types'

import SelectableGroupContext from './Context'

class DeselectAllButton extends Component {
  static contextType = SelectableGroupContext

  static propTypes = {
    children: node,
    component: node,
  }

  static defaultProps = {
    component: 'div',
  }

  componentDidMount() {
    this.root.addEventListener('mousedown', e => e.stopPropagation())
  }

  getRootRef = c => (this.root = c)

  render() {
    const { children, className, ...rest } = this.props

    return (
      <this.props.component
        ref={this.getRootRef}
        className={`selectable-deselect-all ${className}`}
        onClick={this.context.selectable.clearSelection}
        {...rest}
      >
        {children}
      </this.props.component>
    )
  }
}

export default DeselectAllButton
