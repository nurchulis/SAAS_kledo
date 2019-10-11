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



class RoomsTable extends React.Component {

  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  componentDidMount() {
    
  }

  render() {
    const { rooms, roomTypes, showEditModalHandler, showEditTypeModalHandler, moveRowHandler, showSpinner } = this.props;
    const columns = [
      {
        title: 'Room',
        dataIndex: 'name',
        key: 'name',
        render: (text, row) => <a href="javascript:;" onClick={() => showEditModalHandler(row.id)}>{text}</a>,
      },
      {
        title: 'Room Type ',
        dataIndex: 'typeName',
        key: 'typeName',
        render: (text, row) => <a href="javascript:;" onClick={() => showEditTypeModalHandler(row.type_id)}>{text}</a>,
      },
    ];

    const formattedRooms = rooms.map(room => {
      return {
        ...room,
        'typeName': roomTypes.find(type => (type.id === room.type_id)).name,
        'key': room.id
      };
    });

    return (
      <DndProvider backend={HTML5Backend}>
        <Spinner spinning={showSpinner} />
        <Table
          columns={columns}
          dataSource={formattedRooms}
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



export default RoomsTable;
