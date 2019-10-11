import React from 'react';
import { Table, Pagination } from 'antd';


class GuestsTable extends React.Component {

  componentDidMount() {
    
  }

  render() {
    const { guests, 
      total, currentPage, loading,
      showEditModalHandler, paginationHandler } = this.props;
    const columns = [
      {
        title: 'Full Name',
        dataIndex: 'full_name',
        key: 'id',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: 'Last Stay',
        dataIndex: 'last_stay',
        key: 'last_stay',
      },
      {
        title: 'Total Stay',
        dataIndex: 'total_stay',
        key: 'total_stay',
      },
      {
        title: 'Total Value',
        dataIndex: 'total_value',
        key: 'total_value',
      },
    ];

    const formattedGuests = guests.map(guest => {
      return {
        ...guest,
        'full_name': `${guest.first_name} ${guest.last_name}`,
        'country': guest.country_id,
        'last_stay': '1 Aug 2019',
        'total_stay': '1',
        'total_value': '$100',
        'key': guest.id,
        // 'commLabel': formatCommission(guest),
      };
    });
    
    return (
      <React.Fragment>
        <Table
          columns={columns}
          dataSource={formattedGuests}
          components={this.components}
          pagination={false}
          onRow={(record) => {
            return {
              onClick: () => showEditModalHandler(record.id),
            };
          }}
          rowClassName={() => 'hand-row'}
          loading={loading}
        />
        <br />
        <Pagination 
          current={currentPage} 
          total={total} 
          pageSize={20}
          className='button-table' 
          onChange={paginationHandler}
          hideOnSinglePage
        />
      </React.Fragment>
    );
  }
}



export default GuestsTable;
