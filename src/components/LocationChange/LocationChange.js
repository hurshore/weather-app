import React, { Component } from 'react';

import classes from './LocationChange.module.css';
import Aux from '../../hoc/Aux/Aux';

class LocationChange extends Component {
  state = {
    city: '',
    state: ''
  };

  changeLocationHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <Aux>
        <div className={classes.ModalHeader}>
          <h3>Choose Location</h3>
          <a href="/#"><i className="fa fa-remove" onClick={this.props.clicked}></i></a>
        </div>
        <hr/>
        <div className={classes.ModalBody}>
          <form>
            <div>
              <label>City</label>
              <input type="text" name="city" value={this.state.city} onChange={this.changeLocationHandler}  />
            </div>
            <div>
              <label>State</label>
              <input type="text" name="state" value={this.state.state} onChange={this.changeLocationHandler} />
            </div>
          </form>
        </div>
        <hr/>
        <div className={classes.ModalFooter}>
          <button type="button" className={classes.Btn + ' ' + classes.Close} onClick={this.props.clicked}>Close</button>
          <button type="button" className={classes.Btn + ' ' + classes.Save} onClick={() => this.props.changed(this.state.city, this.state.state)}>Save changes</button>
        </div>
      </Aux>
    );
  }
}

export default LocationChange;