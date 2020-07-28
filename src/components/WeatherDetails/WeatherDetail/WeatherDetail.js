import React from 'react';

const weatherDetail = (props) => (
  <li>{props.detail}: {props.value}</li>
);

export default weatherDetail;