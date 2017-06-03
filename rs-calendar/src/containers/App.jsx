import React, { Component } from 'react';
import Header from '../components/Header';
import CalendarNav from '../components/CalendarNav';

class App extends Component {
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

export default App;
