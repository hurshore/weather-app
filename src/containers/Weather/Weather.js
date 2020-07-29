import React, { Component } from 'react';

import WeatherDetails from '../../components/WeatherDetails/WeatherDetails';
import axios from 'axios';
import classes from './Weather.module.css';
import Modal from '../../components/UI/Modal/Modal';
import LocationChange from '../../components/LocationChange/LocationChange';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: {
        city: 'Boston',
        state: 'Mass'
      },
      weather: null,
      editing: false,
      loading: false,
      error: false
    }
    this.apiKey = '';
  }
  componentDidMount() {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.location.city},${this.state.location.state}&appid=${this.apiKey}`)
      .then(response => {
        console.log(response);
        this.setState({weather: response.data});
      })
      .catch(error => {
        this.setState({error: error});
      });
  };

  openModalHandler = () => {
    this.setState({editing: true});
  };

  closeModalHandler = () => {
    this.setState({editing: false});
  }

  changeLocationHandler = (city, state) => {
    console.log('Clicked');
    this.setState({loading: true});
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${this.apiKey}`)
      .then(response => {
        console.log(response);
        this.setState({weather: response.data, location: {city: city, state: state}, editing: false, loading: false});
      })
      .catch(error => {
        console.log(error);
        this.setState({editing: false, loading: false, error: error});
      });
  }

  render() {
    let weather = <Spinner />;

    if(this.state.loading) {
      weather = <Spinner />;
    }

    if(this.state.error) {
      weather = <p>Something went wrong. {this.state.error.message}</p>
    }

    if(this.state.weather) {
      weather = (
        <div className={classes.Weather}>
          <h1>{this.state.location.city}</h1>
          <h3>{this.state.weather.weather[0].description}</h3>
          <h3>{this.state.weather.main.temp}</h3>
          <div>
            <img src={`http://openweathermap.org/img/w/${this.state.weather.weather[0].icon}.png`} alt="Weather" />
          </div>
          <WeatherDetails weather={this.state.weather} />
          <hr style={{width: '100%'}} />
          <button type="button" className={classes.Button} onClick={this.openModalHandler}>Change Location</button>
        </div>
      )
    }
    return (
      <Aux>
        {weather}
        <Modal show={this.state.editing} hideModal={this.closeModalHandler}>
          <LocationChange clicked={this.closeModalHandler} changed={this.changeLocationHandler} />
        </Modal>
      </Aux>
    )
  }
}

export default withErrorHandler(Weather, axios);
