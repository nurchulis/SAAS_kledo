import React from 'react'
import { Helmet } from 'react-helmet'
import Rates from 'containers/Rates'

class RatePage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Invoice" />
        <div className="card">
          <div className="card-body">
            <Rates />
          </div>
        </div>
      </div>
    )
  }
}

export default RatePage
