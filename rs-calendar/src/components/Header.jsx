import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { changeDate } from '../actions';
import moment from 'moment';

const Header = (props) => {
  return (
    <header className="header">
      <h1 className="header__title">
        RS-school Calendar
      </h1>
      <div className="header__menu">
        <ul className="header__list">
          <Link className="header__link btn btn-default" to="/month-view">Month</Link>
          <Link className="header__link btn btn-default" to="/week-view">Week</Link>
          <Link className="header__link btn btn-default" to="/day-view">Day</Link>
          <Link className="header__link btn btn-default" to="/agenda-view">Agenda</Link>
        </ul>
        <div>
          <button className="today header__link btn btn-success" onClick={()=>props.changeDate(moment())}>Today</button>
          <a href="/administrator" className="today header__link btn btn-primary">Move To Admin Page</a>
        </div>
      </div>
    </header>
  )
}

export default connect (null, { changeDate }) (Header);
