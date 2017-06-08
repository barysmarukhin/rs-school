import React, { Component } from 'react';
import Header from '../components/Header';
import CalendarNav from '../components/CalendarNav';
import { connect } from 'react-redux';
import { getEvents } from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.onGetEvents();
  }
  render() {
    return (
      <section className="calendar">
        <Header/>
        <CalendarNav/>
        {this.props.children}
      </section>
    )
  }
}

export default connect (null, dispatch => ({
  onGetEvents:() => {
    dispatch(getEvents());
  }
})) (App);
