import React from 'react'
import { Helmet } from 'react-helmet'
import Rooms from 'containers/Rooms'

class RoomPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Invoice" />
        <div className="card">
          <div className="card-body">
            <Rooms />
          </div>
        </div>
      </div>
    )
  }
}

export default RoomPage
