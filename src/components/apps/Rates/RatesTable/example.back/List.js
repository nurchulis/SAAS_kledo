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
          <SelectableAlbum 
            key={item.id} 
            id={item.id} 
            date={item.date} 
            currentMonth={item.currentMonth} 
            highlighted={item.highlighted}
          />
          ))}
      </div>
      
    )
  }
}

export default List
