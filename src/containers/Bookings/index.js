import React from 'react';
import {connect} from 'react-redux';
import {message} from 'antd';
import _ from 'lodash';

import {BookingsTable, AddBooking, EditBooking, DeleteBooking, AddExtra, AddGuest} from '../../components/apps/Bookings';
import * as Apis from '../../utils/apis';

class Bookings extends React.Component {
  state = {
    allBookings: {},

    showListBooking: false,
    showAddForm: false,
    showEditForm: false,
    showDeleteModal: false,
    showAddExtraModal: false,

    currentEditBooking: null,

    confirmLoadingAdd: false,
    confirmLoadingEdit: false,
    confirmLoadingDelete: false,
    editCommProps: null,

    showSpinnerReorderBooking: false,
  };

  componentDidMount() {
    Apis.getBookingOverview()
      .then((resp) => {
        this.setState({
          allBookings: resp.data.data,
          showListBooking: true
        });      
      });
  }

  showBookingListHandler = () => {
    this.setState({
      showListBooking: true,
      showAddForm: false,
      showEditForm: false
    });
  };

  showAddFormHandler = () => {
    this.setState({
      showListBooking: false,
      showAddForm: true,
      showEditForm: false
    });
  };

  showEditFormHandler = (bookingId) => {
    const { bookings } = this.props;
    const currentBooking = bookings.find( item => {
      return item.id === bookingId;
    });
    this.setState({
      showEditForm: true,
      currentEditBooking: currentBooking,
      editCommProps: null,
    });
    console.log("showEditFormHandler: currentBooking", currentBooking);
  };

  showDeleteModalHandler = () => {
    this.setState({
      showDeleteModal: true,
    });
  };

  showAddExtraModalHandler = () => {
    this.setState({showAddExtraModal: true});
  };

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

      
      let label = null;
      label = "Booking";
      this.props.onAddBooking(values).then(
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


      // hapus booking, atau hapus booking type sesuai tab yg dipilih
      let data = null;
      let label = null;
        data = {
          id: values.bookingId
        }
        label = "Booking";
        this.props.onDeleteBooking(data).then(
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
        id: this.state.currentEditBooking.id,
        ...values
      }
      this.props.onEditBooking(data).then(
        () => {
          form.resetFields();
          message.success(`Booking successfully updated.`);
          this.setState({
            confirmLoadingEdit: false,
          });
          this.hideEditModalHandler();
        }
      ).catch(
        () => {
          console.log("onEditBooking", data);
          message.danger(`Error:: Cannot update booking.`);
          this.setState({
            confirmLoadingEdit: false,
          });
        }
      );
      
    });
  }

  moveRowHandler = (dragIndex, hoverIndex) => {
    // const { data } = this.state;
    // const dragRow = data[dragIndex];

    const { bookings }= this.props;
    console.log("moveRowHandler dragIndex", dragIndex);
    console.log("moveRowHandler hoverIndex", hoverIndex);

    console.log("moveRowHandler bookings", bookings);

    this.setState({
      showSpinnerReorderBooking: true,
    });

    
    const data = {
      dragIndex,
      hoverIndex,
      srcId: bookings[dragIndex].id,
      destId: bookings[hoverIndex].id,
    }
    this.props.onMoveBooking(data).then(
      () => {
        message.success(`Booking moved successfully.`);
        
        this.setState({
          showSpinnerReorderBooking: false,
        });
        
      }
    ).catch(
      () => {
        message.danger(`Error:: Cannot move the booking.`);
        
        this.setState({
          showSpinnerReorderBooking: false,
        });
        
      }
    );
    
  }

  saveEditFormRef = formRef => {
    this.editFormRef = formRef;
  };

  saveAddFormRef = formRef => {
    this.addFormRef = formRef;
  };

  saveDeleteFormRef = formRef => {
    this.deleteFormRef = formRef;
  };

  onParamChange = (params) => {
    Apis.getBookingOverview(params)
      .then((resp) => {
        this.setState({
          allBookings: resp.data.data
        });      
      });
  };

  addExtraOnOkHandler = () => {};

  addExtraOnCancelHandler = () => {};

  render() {
    const {rooms, channels, bookings, bookingTypes, bookingStatuses, extras, loading} = this.props;
    const {allBookings, showListBooking, showAddForm, showEditForm, showDeleteModal, showAddExtraModal, showSpinnerReorderBooking,currentEditBooking,confirmLoadingDelete, confirmLoadingAdd, confirmLoadingEdit, confirmLoadingAddExtra} = this.state;

    if (loading)
      return <React.Fragment />;

    return (
      <>
        <BookingsTable 
          show={showListBooking}
          rooms={rooms}
          channels={channels}
          allBookings={allBookings}
          bookingStatuses={bookingStatuses}
          onParamChange={this.onParamChange}
          showSpinner={showSpinnerReorderBooking}
          showAddFormHandler={this.showAddFormHandler}
        />
        <AddBooking 
          bookings={bookings}
          bookingTypes={bookingTypes}
          show={showAddForm}
          wrappedComponentRef={this.saveAddFormRef}
          confirmLoading={confirmLoadingAdd}
          submitHandler={this.addSubmitHandler}
          showBookingListHandler={this.showBookingListHandler}
          showAddExtraModal={this.showAddExtraModalHandler}
        />
        <EditBooking
          show={showEditForm}
          booking={currentEditBooking}
          bookingTypes={bookingTypes}
          wrappedComponentRef={this.saveEditFormRef}
          confirmLoading={confirmLoadingEdit}
          hideHandler={this.hideEditModalHandler}
          typeChangeHandler={(val) => this.typeChangeEditHandler(val)}
          submitHandler={this.editSubmitHandler}
        />
        <DeleteBooking 
          bookings={bookings}
          show={showDeleteModal}
          hideHandler={this.hideDeleteModalHandler}
          submitHandler={this.deleteSubmitHandler}
          wrappedComponentRef={this.saveDeleteFormRef}
          confirmLoading={confirmLoadingDelete}
        />
        <AddExtra 
          extras={extras}
          show={showAddExtraModal}
          onOkHandler={this.addExtraOnOkHandler}
          confirmLoading={confirmLoadingAddExtra}
          onCancelHandler={this.addExtraOnCancelHandler}
        />
        <AddGuest />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.inits.loading,
    rooms: state.rooms.rooms,
    channels: state.channels.channels,
    bookingStatuses: state.bookingStatuses.bookingStatuses,
    extras: state.extras.extras
  };
}

const mapDispatchToProps = dispatch => {
  return {
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
