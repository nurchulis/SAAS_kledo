import React from 'react';
import { Table } from 'antd';

import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Spinner from '../../../UI/Spinner';

let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />),
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);



class ChannelsTable extends React.Component {

  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  componentDidMount() {
    
  }

  render() {
    const { channels, channelTypes, showEditModalHandler, moveRowHandler, showSpinner } = this.props;
    const columns = [
      {
        title: 'Channel',
        dataIndex: 'name',
        key: 'id',
        render: (text, row) => <a href="javascript:;" onClick={() => showEditModalHandler(row.id)}>{text}</a>,
      },
      {
        title: 'Commission Type',
        dataIndex: 'typeName',
        key: 'type_id',
      },
      {
        title: 'Commission',
        dataIndex: 'commLabel',
        key: 'commission',
      },
    ];

    const formatCommission = (channel) => {
      switch (channel.type_id) {
        case 3: // flat commission
          return `\$${channel.commission}`;
        case 4: // no commission
          return `-`;
        default:
          return `${channel.commission}%`;
      }
    }

    const formattedChannels = channels.map(channel => {
      return {
        ...channel,
        'typeName': channelTypes.find(type => (type.id === channel.type_id)).name,
        'key': channel.id,
        'commLabel': formatCommission(channel),
      };
    });

    
    return (
      <DndProvider backend={HTML5Backend}>
        <Spinner spinning={showSpinner} />
        <Table
          columns={columns}
          dataSource={formattedChannels}
          components={this.components}
          pagination={false}
          onRow={(record, index) => ({
            index,
            moveRow: moveRowHandler,
          })}
        />
      </DndProvider>
    );
  }
}



export default ChannelsTable;
