import React from 'react'
import { Helmet } from 'react-helmet'
import Channels from 'containers/Channels'

class ChannelPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Invoice" />
        <div className="card">
          <div className="card-body">
            <Channels />
          </div>
        </div>
      </div>
    )
  }
}

export default ChannelPage
