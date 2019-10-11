import React from 'react';
import {Helmet} from 'react-helmet';
import Bookings from 'containers/Bookings';

class BookingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet title="Bookings" />
        <div className="card">
          <div className="card-body">
            <Bookings />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default BookingPage;
