import React, { Component } from 'react'
import SelectableAlbum from './Album'

class List extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items
  }

  render() {
    return (
      
        <div className="Rtable Rtable--7cols">
          {this.props.items.map(item => (
            <SelectableAlbum key={item.year} title={item.title} year={item.year} />
          ))}
        </div>
      
    )
  }
}

export default List
