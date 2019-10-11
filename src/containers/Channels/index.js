import React from 'react';
import { connect } from 'react-redux';
import { Button, message } from 'antd';

import ChannelsTable from 'components/apps/Channels/ChannelsTable';
import AddChannel from 'components/apps/Channels/AddChannel';
import DeleteChannel from 'components/apps/Channels/DeleteChannel';
import EditChannel from 'components/apps/Channels/EditChannel';

import * as actions from 'redux/channels/actions';


class Channels extends React.Component {
  state = {
    showAddModal: false,
    confirmLoadingAdd: false,
    addCommProps: {
      disabled: true,
      max: 0,
      formatter: null,
      parser: null,
      required: false,
    },

    showDeleteModal: false,
    confirmLoadingDelete: false,
    
    showEditModal: false,
    currentEditChannel: null,
    confirmLoadingEdit: false,
    editCommProps: null,

    showSpinnerReorderChannel: false,

    
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

  showEditModalHandler = (channelId) => {
    const { channels } = this.props;
    const currentChannel = channels.find( item => {
      return item.id === channelId;
    });
    this.setState({
      showEditModal: true,
      currentEditChannel: currentChannel,
      editCommProps: null,
    });
    console.log("showEditModalHandler: currentChannel", currentChannel);
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
      currentEditChannel: null,
      editCommProps: null,
    });
  };

  formatCommissionInput = (val) => {
    console.log("typeChangeHandler", val);
    let commProps = null;
    switch(val){
      case 3: // flat rate
        commProps={
          disabled: false,
          max: 10000000,
          formatter: (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          parser: value => value.replace(/\$\s?|(,*)/g, ''),
          required: true,
        }
        break;
      case 4: // no commission
        commProps={
          disabled: true,
          formatter: null,
          parser: null,
          required: false,
        }
        break;
      default:
          commProps={
            disabled: false,
            max: 100,
            formatter: (value) => `${value}%`,
            parser: value => value.replace('%', ''),
            required: true,
          }
    }
    return commProps;
  }

  typeChangeAddHandler = (val) => {
    console.log("typeChangeAddHandler", val);
    
    this.setState({
      addCommProps: this.formatCommissionInput(val)
    });
  }

  typeChangeEditHandler = (val) => {
    console.log("typeChangeEditHandler", val);
    this.setState({
      editCommProps: this.formatCommissionInput(val)
    });
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

      
      let label = null;
      label = "Channel";
      this.props.onAddChannel(values).then(
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


      // hapus channel, atau hapus channel type sesuai tab yg dipilih
      let data = null;
      let label = null;
        data = {
          id: values.channelId
        }
        label = "Channel";
        this.props.onDeleteChannel(data).then(
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
        id: this.state.currentEditChannel.id,
        ...values
      }
      this.props.onEditChannel(data).then(
        () => {
          form.resetFields();
          message.success(`Channel successfully updated.`);
          this.setState({
            confirmLoadingEdit: false,
          });
          this.hideEditModalHandler();
        }
      ).catch(
        () => {
          console.log("onEditChannel", data);
          message.danger(`Error:: Cannot update channel.`);
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

    const { channels }= this.props;
    console.log("moveRowHandler dragIndex", dragIndex);
    console.log("moveRowHandler hoverIndex", hoverIndex);

    console.log("moveRowHandler channels", channels);

    this.setState({
      showSpinnerReorderChannel: true,
    });

    
    const data = {
      dragIndex,
      hoverIndex,
      srcId: channels[dragIndex].id,
      destId: channels[hoverIndex].id,
    }
    this.props.onMoveChannel(data).then(
      () => {
        message.success(`Channel moved successfully.`);
        
        this.setState({
          showSpinnerReorderChannel: false,
        });
        
      }
    ).catch(
      () => {
        message.danger(`Error:: Cannot move the channel.`);
        
        this.setState({
          showSpinnerReorderChannel: false,
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

  render() {
    const { channels, channelTypes, loading } = this.props;
    const { showAddModal, showDeleteModal, showEditModal, showSpinnerReorderChannel,
      currentEditChannel,
      confirmLoadingDelete, confirmLoadingAdd, confirmLoadingEdit,
      editCommProps, addCommProps,
     } = this.state;

    if( loading )
      return <React.Fragment />;

    return (
      <React.Fragment>
        <ChannelsTable 
          channels={channels}
          channelTypes={channelTypes}
          showSpinner={showSpinnerReorderChannel}
          showEditModalHandler={this.showEditModalHandler}
          moveRowHandler={(dragIndex, hoverIndex) => this.moveRowHandler(dragIndex, hoverIndex)}
        />
        <Button className='button-table' type="primary" onClick={this.showAddModalHandler}>
            Add Channel
        </Button>
        <Button className='button-table' type="danger" onClick={this.showDeleteModalHandler}>
            Delete
        </Button>
        <AddChannel 
          channels={channels}
          channelTypes={channelTypes}
          show={showAddModal}
          wrappedComponentRef={this.saveAddFormRef}
          confirmLoading={confirmLoadingAdd}
          submitHandler={this.addSubmitHandler}
          hideHandler={this.hideAddModalHandler}
          commProps={addCommProps}
          typeChangeHandler={(val) => this.typeChangeAddHandler(val)}
        />
        <EditChannel
          show={showEditModal}
          channel={currentEditChannel}
          channelTypes={channelTypes}
          wrappedComponentRef={this.saveEditFormRef}
          confirmLoading={confirmLoadingEdit}
          commProps={editCommProps}
          hideHandler={this.hideEditModalHandler}
          typeChangeHandler={(val) => this.typeChangeEditHandler(val)}
          submitHandler={this.editSubmitHandler}
        />
        <DeleteChannel 
          channels={channels}
          show={showDeleteModal}
          hideHandler={this.hideDeleteModalHandler}
          submitHandler={this.deleteSubmitHandler}
          wrappedComponentRef={this.saveDeleteFormRef}
          confirmLoading={confirmLoadingDelete}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    channels: state.channels.channels,
    channelTypes: state.channels.channelTypes,
    loading: state.inits.loading,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteChannel: (id) => dispatch(actions.deleteChannel(id)),
    onAddChannel: (payload) => dispatch(actions.addChannel(payload)),
    onEditChannel: (payload) => dispatch(actions.editChannel(payload)),
    onMoveChannel: (payload) => dispatch(actions.moveChannel(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( Channels );
