import React from 'react';
import { connect } from 'react-redux';
import { Button, message } from 'antd';

import RoomsTable from 'components/apps/Rooms/RoomsTable';
import AddRoom from 'components/apps/Rooms/AddRoom';
import DeleteRoom from 'components/apps/Rooms/DeleteRoom';
import EditRoom from 'components/apps/Rooms/EditRoom';
import EditRoomType from 'components/apps/Rooms/EditRoomType';

import * as actions from 'redux/rooms/actions';


class Rooms extends React.Component {
  state = {
    showAddModal: false,
    showAddTab: true,
    confirmLoadingAdd: false,

    showDeleteModal: false,
    showDeleteTab: true,
    confirmLoadingDelete: false,
    
    showEditModal: false,
    currentEditRoom: null,
    confirmLoadingEdit: false,

    showEditTypeModal: false,
    currentEditType: null,
    confirmLoadingEditType: false,

    showSpinnerReorderRoom: false,
  };

  componentDidMount() {
    // console.log(this.props); 
    // this.props.onInits();
  }

  showAddModalHandler = () => {
    this.setState({
      showAddModal: true,
    });
  };

  showEditModalHandler = (roomId) => {
    const { rooms } = this.props;
    const currentRoom = rooms.find( item => {
      return item.id === roomId;
    });
    this.setState({
      showEditModal: true,
      currentEditRoom: currentRoom,
    });
    // console.log("showEditModalHandler", roomId);
    console.log("showEditModalHandler: currentRoom", currentRoom);
  };

  showEditTypeModalHandler = (roomTypeId) => {
    const { roomTypes } = this.props;
    const currentRoomType = roomTypes.find( item => {
      return item.id === roomTypeId;
    });
    this.setState({
      showEditTypeModal: true,
      currentEditType: currentRoomType,
    });
    // console.log("showEditTypeModalHandler: roomTypeId", roomTypeId);
    // console.log("showEditTypeModalHandler: currentRoomType", currentRoomType);
  };

  showDeleteModalHandler = () => {
    this.setState({
      showDeleteModal: true,
    });
  };

  hideAddModalHandler = () => {
    this.setState({
      showAddModal: false,
    });
  };

  hideDeleteModalHandler = () => {
    this.setState({
      showDeleteModal: false,
    });
  };

  hideEditModalHandler = () => {
    this.setState({
      showEditModal: false,
    });
  };

  hideEditTypeModalHandler = () => {
    this.setState({
      showEditTypeModal: false,
    });
  };

  deleteTabClickHandler = event => {
    const tabType = event.target.value;
    // console.log("deleteTabClickHandler",tabType);
    if(tabType === 'room') {
      this.setState({
        showDeleteTab: true,
      });
    }
    else {
      this.setState({
        showDeleteTab: false,
      });
    }
  }

  addTabClickHandler = event => {
    const tabType = event.target.value;
    if(tabType === 'room') {
      this.setState({
        showAddTab: true,
      });
    }
    else {
      this.setState({
        showAddTab: false,
      });
    }
  }

  addSubmitHandler = () => {
    const { form } = this.addFormRef.props;
    // console.log('deleteSubmitHandler',this.deleteFormRef.props);
    form.validateFields({ force: true },(err, values) => {
      if (err) {
        // console.log('deleteSubmitHandler: ERROR');
        return;
      }

      console.log('Received values of form: ', values);

      this.setState({
        confirmLoadingAdd: true,
      });

      
      let data = null;
      let label = null;
      if( this.state.showAddTab ){
        data = {
          name: values.roomName,
          typeId: values.roomTypeId
        }
        label = "Room";
        this.props.onAddRoom(data).then(
          () => {
            form.resetFields();
            message.success(`${label} successfully added.`);
            this.setState({
              confirmLoadingAdd: false,
            });
            this.hideAddModalHandler();
          }
        ).catch(
          () => {
            message.danger(`Error:: Cannot add ${label}.`);
            this.setState({
              confirmLoadingAdd: false,
            });
          }
        );
      }
      else{
        data = {
          name: values.roomTypeName,
        }
        label = "Room Type";
        this.props.onAddRoomType(data).then(
          () => {
            // console.log('deleting room type', data);
            form.resetFields();
            message.success(`${label} successfully added.`);
            this.setState({
              confirmLoadingAdd: false,
            });
            this.hideAddModalHandler();
          }
        ).catch(
          () => {
            message.danger(`Error:: Cannot add ${label}.`);
            this.setState({
              confirmLoadingAdd: false,
            });
          }
        );
      }
      
      
    });
  }
  
  deleteSubmitHandler = () => {
    const { form } = this.deleteFormRef.props;
    // console.log('deleteSubmitHandler',this.deleteFormRef.props);
    form.validateFields({ force: true },(err, values) => {
      if (err) {
        // console.log('deleteSubmitHandler: ERROR');
        return;
      }

      console.log('Received values of form: ', values);

      this.setState({
        confirmLoadingDelete: true,
      });


      // hapus room, atau hapus room type sesuai tab yg dipilih
      let data = null;
      let label = null;
      if( this.state.showDeleteTab ){
        data = {
          id: values.roomId
        }
        label = "Room";
        this.props.onDeleteRoom(data).then(
          () => {
            form.resetFields();
            message.success(`${label} successfully deleted.`);
            this.setState({
              confirmLoadingDelete: false,
            });
            this.hideDeleteModalHandler();
          }
        ).catch(
          () => {
            message.danger(`Error:: Cannot delete ${label}.`);
            this.setState({
              confirmLoadingDelete: false,
            });
          }
        );
      }
      else{
        data = {
          id: values.roomTypeId
        }
        label = "Room Type";
        this.props.onDeleteRoomType(data).then(
          () => {
            // console.log('deleting room type', data);
            form.resetFields();
            message.success(`${label} successfully deleted.`);
            this.setState({
              confirmLoadingDelete: false,
            });
          }
        ).catch(
          () => {
            message.danger(`Error:: Cannot delete ${label}.`);
            this.setState({
              confirmLoadingDelete: false,
            });
          }
        );
      }
      
    });
  }

  editSubmitHandler = () => {
    const { form } = this.editFormRef.props;
    // console.log('deleteSubmitHandler',this.deleteFormRef.props);
    form.validateFields({ force: true },(err, values) => {
      if (err) {
        // console.log('deleteSubmitHandler: ERROR');
        return;
      }

      console.log('Received values of form: ', values);

      this.setState({
        confirmLoadingEdit: true,
      });

      const data = {
        id: this.state.currentEditRoom.id,
        name: values.name,
        typeId: values.typeId
      }
      this.props.onEditRoom(data).then(
        () => {
          form.resetFields();
          message.success(`Room successfully updated.`);
          this.setState({
            confirmLoadingEdit: false,
          });
          this.hideEditModalHandler();
        }
      ).catch(
        () => {
          message.danger(`Error:: Cannot aupdate room.`);
          this.setState({
            confirmLoadingEdit: false,
          });
        }
      );
      
      
    });
  }

  editTypeSubmitHandler = () => {
    const { form } = this.editTypeFormRef.props;
    // console.log('deleteSubmitHandler',this.deleteFormRef.props);
    form.validateFields({ force: true },(err, values) => {
      if (err) {
        // console.log('deleteSubmitHandler: ERROR');
        return;
      }

      console.log('Received values of form: ', values);

      this.setState({
        confirmLoadingEditType: true,
      });

      const data = {
        id: this.state.currentEditType.id,
        name: values.name,
      }
      this.props.onEditRoomType(data).then(
        () => {
          form.resetFields();
          message.success(`Room type successfully updated.`);
          this.setState({
            confirmLoadingEditType: false,
          });
        }
      ).catch(
        () => {
          message.danger(`Error:: Cannot update room type.`);
          this.setState({
            confirmLoadingEditType: false,
          });
        }
      );
    });
  }

  moveRowHandler = (dragIndex, hoverIndex) => {
    // const { data } = this.state;
    // const dragRow = data[dragIndex];

    const { rooms }= this.props;
    console.log("moveRowHandler dragIndex", dragIndex);
    console.log("moveRowHandler hoverIndex", hoverIndex);

    console.log("moveRowHandler rooms", rooms);

    this.setState({
      showSpinnerReorderRoom: true,
    });

    
    const data = {
      dragIndex,
      hoverIndex,
      srcId: rooms[dragIndex].id,
      destId: rooms[hoverIndex].id,
    }
    this.props.onMoveRoom(data).then(
      () => {
        message.success(`Room moved successfully.`);
        
        this.setState({
          showSpinnerReorderRoom: false,
        });
        
      }
    ).catch(
      () => {
        message.danger(`Error:: Cannot move the room.`);
        
        this.setState({
          showSpinnerReorderRoom: false,
        });
        
      }
    );
    
  }

  saveEditFormRef = formRef => {
    this.editFormRef = formRef;
  };

  saveEditTypeFormRef = formRef => {
    this.editTypeFormRef = formRef;
  };

  saveAddFormRef = formRef => {
    this.addFormRef = formRef;
  };

  saveDeleteFormRef = formRef => {
    this.deleteFormRef = formRef;
  };

  render() {
    const { rooms, roomTypes, loading } = this.props;
    const { showAddModal, showDeleteModal, showAddTab, 
      showDeleteTab, showEditModal, showSpinnerReorderRoom,
      currentEditRoom,
      showEditTypeModal, currentEditType, 
      confirmLoadingDelete, confirmLoadingAdd, confirmLoadingEdit, confirmLoadingEditType,
     } = this.state;

    if( loading )
      return <React.Fragment />;

    return (
      <React.Fragment>
        <RoomsTable 
          rooms={rooms}
          roomTypes={roomTypes}
          showSpinner={showSpinnerReorderRoom}
          showEditModalHandler={this.showEditModalHandler}
          showEditTypeModalHandler={this.showEditTypeModalHandler}
          moveRowHandler={(dragIndex, hoverIndex) => this.moveRowHandler(dragIndex, hoverIndex)}
        />
        <Button className='button-table' type="primary" onClick={this.showAddModalHandler}>
            Add Room
        </Button>
        <Button className='button-table' type="danger" onClick={this.showDeleteModalHandler}>
            Delete
        </Button>
        <AddRoom 
          rooms={rooms}
          roomTypes={roomTypes}
          show={showAddModal}
          tabClickHandler={event => this.addTabClickHandler(event)}
          showAddTab={showAddTab}
          wrappedComponentRef={this.saveAddFormRef}
          confirmLoading={confirmLoadingAdd}
          submitHandler={this.addSubmitHandler}
          hideHandler={this.hideAddModalHandler}
        />
        <EditRoom
          roomTypes={roomTypes}
          show={showEditModal}
          room={currentEditRoom}
          wrappedComponentRef={this.saveEditFormRef}
          confirmLoading={confirmLoadingEdit}
          hideHandler={this.hideEditModalHandler}
          submitHandler={this.editSubmitHandler}
        />
        <EditRoomType
          show={showEditTypeModal}
          hideHandler={this.hideEditTypeModalHandler}
          submitHandler={this.editTypeSubmitHandler}
          roomType={currentEditType}
          wrappedComponentRef={this.saveEditTypeFormRef}
          confirmLoading={confirmLoadingEditType}
        />
        <DeleteRoom 
          rooms={rooms}
          roomTypes={roomTypes}
          show={showDeleteModal}
          hideHandler={this.hideDeleteModalHandler}
          tabClickHandler={event => this.deleteTabClickHandler(event)}
          submitHandler={this.deleteSubmitHandler}
          showDeleteTab={showDeleteTab}
          wrappedComponentRef={this.saveDeleteFormRef}
          confirmLoading={confirmLoadingDelete}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
      rooms: state.rooms.rooms,
      roomTypes: state.rooms.roomTypes,
      loading: state.inits.loading,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteRoom: (id) => dispatch(actions.deleteRoom(id)),
    onDeleteRoomType: (id) => dispatch(actions.deleteRoomType(id)),
    onAddRoom: (payload) => dispatch(actions.addRoom(payload)),
    onAddRoomType: (payload) => dispatch(actions.addRoomType(payload)),
    onEditRoom: (payload) => dispatch(actions.editRoom(payload)),
    onEditRoomType: (payload) => dispatch(actions.editRoomType(payload)),
    onMoveRoom: (payload) => dispatch(actions.moveRoom(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( Rooms );
