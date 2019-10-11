import React from 'react';
import {Button, Table, Pagination, Row, Col, Popover} from 'antd';
import _ from 'lodash';

import {FilterWidget, SearchWidget, Spinner} from '../../../UI';

import {departingColumns, arrivingColumns, checkedinColumns, bookingColumns} from './columns';

class BookingsTable extends React.Component {

  state = {
    params: []
  };

  pageChange = (page) => {
    this.setState((prevState) => {
      const {params} = {...prevState};

      if ((params.page && params.page !== page) || (params.page && params.page !== '') || !params.page) {
        params.page = page;
      }

      return {params};
    }, () => {
      const {params} = this.state;

      this.paramChange(params);
    });
  }

  filterChange = (filters) => {
    this.setState((prevState) => {
      const {params} = {...prevState};

      if ((params.bookingStatusIds && !_.isEqual(params.bookingStatusIds, filters.bookingStatusIds)) || !params.bookingStatusIds) {
        params.bookingStatusIds = filters.bookingStatusIds;
      }
  
      if ((params.dates && !_.isEqual(params.dates, filters.dates)) || !params.dates) {
        params.dates = filters.dates;
      }

      if ((params.channelId && params.channelId !== filters.channelId) || !params.channelId) {
        params.channelId = filters.channelId;
      }

      return {params};
    }, () => {
      const {params} = this.state;

      this.paramChange(params);
    });
  };

  paramChange = (params) => {
    const {onParamChange} = this.props;
    
    onParamChange(params);
  }

  render() {
    const {showSpinner, show, showAddFormHandler, allBookings, bookingStatuses, rooms, channels} = this.props;
    const {departing: departings, arriving: arrivings, checkedin: checkedins, all: bookings} = allBookings;

    const formattedDepartings = departings ? departings.map((departing) => {
      let newDeparting = {};
      
      departing.rooms_departing.forEach((roomDeparting) => {
        const guestObj = roomDeparting.guests.find(guest => guest.pivot.is_main_guest === 1);
        const guestName = `${guestObj.first_name} ${guestObj.last_name}`;

        let roomName = '';
        const theRoom = rooms.find(room => room.id === roomDeparting.room_id);
        if (theRoom) {
          roomName = theRoom.name;
        }

        let channelName = '';
        const theChannel = channels.find(channel => channel.id === departing.channel_id);
        if (theChannel) {
          channelName = theChannel.name;
        }

        newDeparting = {
          key: roomDeparting.id,
          guestName,
          roomName,
          departureTime: roomDeparting.departure_time,
          channelName,
          owing: departing.owing
        };  
      });

      return newDeparting;
    }) : [];

    const formattedArrivings = arrivings ? arrivings.map((arriving) => {
      let newArriving = {};
      
      arriving.rooms_arriving.forEach((roomArriving) => {
        const guestObj = roomArriving.guests.find(guest => guest.pivot.is_main_guest === 1);
        const guestName = `${guestObj.first_name} ${guestObj.last_name}`;

        let roomName = '';
        const theRoom = rooms.find(room => room.id === roomArriving.room_id);
        if (theRoom) {
          roomName = theRoom.name;
        }

        let channelName = '';
        const theChannel = channels.find(channel => channel.id === arriving.channel_id);
        if (theChannel) {
          channelName = theChannel.name;
        }

        newArriving = {
          key: roomArriving.id,
          guestName,
          roomName,
          arrivalTime: roomArriving.departure_time,
          channelName,
          owing: arriving.owing
        };  
      });

      return newArriving;
    }) : [];

    const formattedCheckedins = checkedins ? checkedins.map((checkedin) => {
      let newCheckedin = {};
      
      checkedin.rooms_checkedin.forEach((roomCheckedin) => {
        const guestObj = roomCheckedin.guests.find(guest => guest.pivot.is_main_guest === 1);
        const guestName = `${guestObj.first_name} ${guestObj.last_name}`;

        let roomName = '';
        const theRoom = rooms.find(room => room.id === roomCheckedin.room_id);
        if (theRoom) {
          roomName = theRoom.name;
        }

        newCheckedin = {
          key: roomCheckedin.id,
          guestName,
          roomName,
          checkinDate: roomCheckedin.checkin_date,
          checkoutDate: roomCheckedin.checkout_date
        };  
      });

      return newCheckedin;
    }) : [];

    const formattedBookings = bookings && bookings.data ? bookings.data.map((booking) => {
      let newBooking = {};
      
      booking.rooms.forEach((roomBooking) => {
        const guestObj = roomBooking.guests.find(guest => guest.pivot.is_main_guest === 1);
        const guestName = `${guestObj.first_name} ${guestObj.last_name}`;

        newBooking = {
          key: roomBooking.id,
          status: booking.booking_status_id,
          guestName,
          checkinDate: roomBooking.checkin_date,
          bookingDate: roomBooking.booking_date,
          earning: roomBooking.earning
        };  
      });

      return newBooking;
    }) : [];

    return (
      <div className="fade-in" style={show && show === true ? {display: 'block'} : {display: 'none'}}>
        <Row>
          <Col span={12}>
            <h2 style={{marginBottom: '30px'}}>Booking List</h2>
          </Col>
          <Col span={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button type="primary" icon="plus" onClick={showAddFormHandler}>Create Booking</Button>
          </Col>
        </Row>

        <Spinner spinning={showSpinner} />

        <Row style={{marginBottom: '30px'}}>
          <Col span={12} style={{paddingRight: '20px'}}>
            <Popover 
              placement="bottomLeft"
              content={<FilterWidget channels={channels} bookingStatuses={bookingStatuses} onChange={this.filterChange} />}
              trigger="click"
            >
              <Button icon="filter">Filter</Button>
            </Popover>
          </Col>
          <Col span={12} style={{paddingLeft: '20px', display: 'flex', justifyContent: 'flex-end'}}>
            <SearchWidget />
          </Col>
        </Row>
        
        <h3>Departing</h3>
        <Table
          columns={departingColumns}
          dataSource={formattedDepartings}
          pagination={false}
          style={{marginBottom: '30px'}}
        />

        <h3>Arriving</h3>
        <Table
          columns={arrivingColumns}
          dataSource={formattedArrivings}
          pagination={false}
          style={{marginBottom: '30px'}}
        />

        <h3>Currently Checked In</h3>
        <Table
          columns={checkedinColumns}
          dataSource={formattedCheckedins}
          pagination={false}
          style={{marginBottom: '30px'}}
        />

        <h3>All Bookings</h3>
        <Table
          columns={bookingColumns}
          dataSource={formattedBookings}
          pagination={false}
          style={{marginBottom: '20px'}}
        />
        <Pagination defaultCurrent={bookings && bookings.current_page ? bookings.current_page : 1} total={bookings && bookings.total ? bookings.total : 0} onChange={this.pageChange} />
      </div>
    );
  }
}

export default BookingsTable;
