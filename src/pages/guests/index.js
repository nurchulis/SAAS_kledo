import React from 'react'
import { Helmet } from 'react-helmet'
import Guests from 'containers/Guests'

class GuestPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Invoice" />
        <div className="card">
          <div className="card-body">
            <Guests />
          </div>
        </div>
      </div>
    )
  }
}

export default GuestPage
