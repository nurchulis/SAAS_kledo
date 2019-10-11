import React from 'react';
import { connect } from 'react-redux';
import { Button, message } from 'antd';

import GuestsTable from 'components/apps/Guests/GuestsTable';
import AddGuest from 'components/apps/Guests/AddGuest';
import EditGuest from 'components/apps/Guests/EditGuest';

import * as actions from 'redux/actions';


class Guests extends React.Component {
  state = {
    loadingTable: true,
    showAddModal: false,
    confirmLoadingAdd: false,

    confirmLoadingDelete: false,
    
    showEditModal: false,
    currentEditGuest: null,
    confirmLoadingEdit: false,
    childCheckedEdit: null,
  };

  componentDidMount () {
    this.loadGuests(1);
  }


  loadGuests = (page) => {
    const values = {
      page
    };

    this.setState({
      loadingTable: true,
    });
    this.props.onInitGuests(values).then(
      () => {
        this.setState({
          loadingTable: false,
        });
      }
    ).catch(
      () => {
        message.danger(`Error:: Cannot load guests data.`);
        this.setState({
          loadingTable: false,
        });
      }
    );
  }

  showAddModalHandler = () => {
    this.setState({
      showAddModal: true,
    });
  };

  showEditModalHandler = (guestId) => {
    // console.log("showEditModalHandler", guestId);
    const { guests } = this.props;
    const currentGuest = guests.find( item => {
      return item.id === guestId;
    });
    this.setState({
      showEditModal: true,
      currentEditGuest: currentGuest,
      childCheckedEdit: currentGuest.is_child === 1 ? true : false,
    });

    console.log("showEditModalHandler: currentGuest", currentGuest);
    console.log("showEditModalHandler: currentGuest.is_child", currentGuest.is_child === 1 ? true : false);
  };

  hideAddModalHandler = () => {
    this.setState({
      showAddModal: false,
    });
  };

  hideEditModalHandler = () => {
    this.setState({
      showEditModal: false,
    });
  };

  
  addSubmitHandler = () => {
    const { form } = this.addFormRef.props;
    // console.log('deleteSubmitHandler',this.deleteFormRef.props);
    form.validateFields({ force: true },(err, values) => {
      if (err) {
        console.log('addSubmitHandler: ERROR', err);
        return;
      }

      console.log('Received values of form: ', values);

      this.setState({
        confirmLoadingAdd: true,
      });

      
      let label = null;
      label = "Guest";
      this.props.onAddGuest(values).then(
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
        id: this.state.currentEditGuest.id,
        ...values,
      }
      console.log("editSubmitHandler", data);
      this.props.onEditGuest(data).then(
        () => {
          form.resetFields();
          message.success(`Guest successfully updated.`);
          this.setState({
            confirmLoadingEdit: false,
          });
          this.hideEditModalHandler();
        }
      ).catch(
        () => {
          message.danger(`Error:: Cannot update guest.`);
          this.setState({
            confirmLoadingEdit: false,
          });
        }
      );
      
      
    });
  }

  deleteSubmitHandler = () => {
    this.setState({
      confirmLoadingDelete: true,
    });
    // hapus guest, atau hapus guest type sesuai tab yg dipilih
    const data = {
      id: this.state.currentEditGuest.id
    }
    console.log("deleteSubmitHandler id", this.state.currentEditGuest.id);
    const label = "Guest";
    this.props.onDeleteGuest(data).then(
      () => {
        message.success(`${label} successfully deleted.`);
        this.setState({
          confirmLoadingDelete: false,
        });
        this.hideEditModalHandler();
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

  

  childChangeHandler = (val) => {
    this.setState({
      childCheckedEdit: val.target.checked,
    });
    console.log("childChangeHandler", val.target.checked);
  }

  paginationHandler = page => {
    this.loadGuests(page);
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

  render() {
    const { guests, paging, countries, bookingTypes } = this.props;
    const { showAddModal, showEditModal, loadingTable,
      currentEditGuest,
      confirmLoadingDelete, confirmLoadingAdd, confirmLoadingEdit,
      childCheckedEdit,
     } = this.state;

    return (
      <React.Fragment>
        <div className='button-table-top'>
          <Button type="primary" onClick={this.showAddModalHandler}>
              Add Guest
          </Button>
        </div>
        <br /><br />
        <GuestsTable 
          guests={guests}
          showEditModalHandler={this.showEditModalHandler}
          currentPage={paging.current_page}
          total={paging.total}
          paginationHandler={page => this.paginationHandler(page)}
          loading={loadingTable}
        />
        <AddGuest 
          guests={guests}
          show={showAddModal}
          countries={countries}
          bookingTypes={bookingTypes}
          wrappedComponentRef={this.saveAddFormRef}
          confirmLoading={confirmLoadingAdd}
          submitHandler={this.addSubmitHandler}
          hideHandler={this.hideAddModalHandler}
          childChangeHandler={(val) => this.childChangeHandler(val)}
          childChecked={childCheckedEdit}
        />
        <EditGuest
          show={showEditModal}
          guest={currentEditGuest}
          countries={countries}
          bookingTypes={bookingTypes}
          wrappedComponentRef={this.saveEditFormRef}
          confirmLoading={confirmLoadingEdit}
          hideHandler={this.hideEditModalHandler}
          childChangeHandler={(val) => this.childChangeHandler(val)}
          submitHandler={this.editSubmitHandler}
          childChecked={childCheckedEdit}
          deleteSubmitHandler={this.deleteSubmitHandler}
          confirmLoadingDelete={confirmLoadingDelete}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    guests: state.guests.guests,
    guestTypes: state.guests.guestTypes,
    loading: state.inits.loading,
    paging: state.guests.paging,
    countries: state.refs.countries,
    bookingTypes: state.refs.bookingTypes,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteGuest: (id) => dispatch(actions.deleteGuest(id)),
    onAddGuest: (payload) => dispatch(actions.addGuest(payload)),
    onEditGuest: (payload) => dispatch(actions.editGuest(payload)),
    onInitGuests: (payload) => dispatch(actions.initGuests(payload)),
    onSetGuests: (payload) => dispatch(actions.setGuests(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( Guests );
