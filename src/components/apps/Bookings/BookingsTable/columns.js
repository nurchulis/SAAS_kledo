const departingColumns = [
  {
    title: 'Guests',
    dataIndex: 'guestName',
    key: 'guestName'
  },
  {
    title: 'Rooms',
    dataIndex: 'roomName',
    key: 'roomName'
  },
  {
    title: 'Departure Time',
    dataIndex: 'departureTime',
    key: 'departureTime'
  },
  {
    title: 'Channel',
    dataIndex: 'channelName',
    key: 'channelName'
  },
  {
    title: 'Still Owing',
    dataIndex: 'owing',
    key: 'owing'
  }
];
  
const arrivingColumns = [
  {
    title: 'Guests',
    dataIndex: 'guestName',
    key: 'guestName'
  },
  {
    title: 'Rooms',
    dataIndex: 'roomName',
    key: 'roomName'
  },
  {
    title: 'Arrival Time',
    dataIndex: 'arrivalTime',
    key: 'arrivalTime'
  },
  {
    title: 'Channel',
    dataIndex: 'channelName',
    key: 'channelName'
  },
  {
    title: 'Still Owing',
    dataIndex: 'owing',
    key: 'owing'
  },
];
  
const checkedinColumns = [
  {
    title: 'Guests',
    dataIndex: 'guestName',
    key: 'guestName'
  },
  {
    title: 'Rooms',
    dataIndex: 'roomName',
    key: 'roomName'
  },
  {
    title: 'Checkin',
    dataIndex: 'checkinDate',
    key: 'checkinDate'
  },
  {
    title: 'Checkout',
    dataIndex: 'checkoutDate',
    key: 'checkoutDate'
  }
];
  
const bookingColumns = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Guests',
    dataIndex: 'guestName',
    key: 'guestName'
  },
  {
    title: 'Dates',
    dataIndex: 'checkinDate',
    key: 'checkinDate'
  },
  {
    title: 'Booked',
    dataIndex: 'bookingDate',
    key: 'bookingDate'
  },
  {
    title: 'Earnings',
    dataIndex: 'earning',
    key: 'earning'
  }
];
  
export {
  departingColumns,
  arrivingColumns,
  checkedinColumns,
  bookingColumns
};