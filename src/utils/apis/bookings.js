import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

export const getBookingOverview = (params) => {
  let stringParam = '';

  if (params) {
    const formattedParams = [];

    if (params.bookingStatusIds && params.bookingStatusIds.length > 0) {
      const bookingStatusIds = _.join(params.bookingStatusIds, ',');
      formattedParams.push(`booking_status_id=${bookingStatusIds}`);
    }

    if (params.dates && params.dates.length > 0) {
      const dateFrom = moment(params.dates[0]).format('YYYY-MM-DD');
      const dateTo = moment(params.dates[1]).format('YYYY-MM-DD');

      formattedParams.push(`date_from=${dateFrom}&date_to=${dateTo}`);
    }

    if (params.channelId && params.channelId !== '' && params.channelId !== 'all') {
      formattedParams.push(`channel_id=${params.channelId}`);
    }

    if (params.page && params.page !== '') {
      formattedParams.push(`page=${params.page}`);
    }

    const concatParams = _.join(formattedParams, '&');
    stringParam = `?${concatParams}`;
  }

  return axios.get(`${process.env.REACT_APP_API_URL}/bookings/overview${stringParam}`);
};

export const getOthers = () => {

};

