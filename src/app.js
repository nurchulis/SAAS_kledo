import React, { Component } from 'react';
import { connect } from 'react-redux';

import Router from 'router'
import * as actions from 'redux/actions';
import Loader from 'components/LayoutComponents/Loader'

class App extends Component {
  componentDidMount() {
    this.props.onInits();
  }

  render () {
    const { history, loading } = this.props;
    const loadingTag =  loading ? <Loader /> : null;
    return (
      <React.Fragment>
        { loadingTag }
        <Router history={history} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.inits.loading,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      onInits: () => dispatch(actions.inits()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
