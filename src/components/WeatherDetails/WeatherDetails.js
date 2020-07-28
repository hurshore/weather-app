import React from 'react';

import WeatherDetail from './WeatherDetail/WeatherDetail';
import classes from './WeatherDetails.module.css';

const weatherDetails = (props) => (
  <ul className={classes.listGroup}>
    <WeatherDetail detail="Humidity" value={props.weather.main.humidity} />
    <WeatherDetail detail="Pressure" value={props.weather.main.pressure} />
    <WeatherDetail detail="Feels Like" value={props.weather.main.feels_like} />
    <WeatherDetail detail="Wind Speed" value={props.weather.wind.speed} />
  </ul>
);

export default weatherDetails;