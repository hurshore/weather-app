import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';

const modal = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.hideModal} />
    <div className={classes.Modal} style={{
      transform: props.show ? 'translate(-50%, -50%)' : 'translate(-37vh, -150vh)',
      opacity: props.show ? '1' : '0'}}>
      {props.children}
    </div>
  </Aux>
);

export default modal;