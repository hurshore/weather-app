import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null});
        return request;
      })
      this.resInterceptor = axios.interceptors.response.use(null, error => {
        this.setState({error: error});
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    hideModalHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} hideModal={this.hideModalHandler} >
            <p style={{textAlign: 'center'}}>{this.state.error ? this.state.error.message : null}</p>
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler;