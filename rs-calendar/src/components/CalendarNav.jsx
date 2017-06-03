import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moveNext, movePrev } from '../actions/index';

class CalendarNav extends Component {
  previous() {
    this.props.movePrev()
  }
  next() {
    this.props.moveNext()
  }
  renderDateLabel() {
    const {
      viewType,
      dateFromState
    } = this.props
    switch (viewType) {
      case 'month':
        return <span className="month-label">{dateFromState.format('MMMM YYYY')}</span>;
      case 'week':
        const startOfWeek = dateFromState.startOf('week').format('MMMM DD');
        const endOfWeek = dateFromState.endOf('week').format('MMMM DD');
        return <span className="month-label">{startOfWeek} - {endOfWeek}</span>;
      default:
        return <span className="month-label">Unknown date format</span>;
    }
  }
  render() {
    return (
      <div className="calendar__nav">
        <div className="month-display custom-row">
          <i className="arrow fa fa-angle-left" onClick={()=>this.previous()}/>
          {this.renderDateLabel()}
          <i className="arrow fa fa-angle-right" onClick={()=>this.next()}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dateFromState: state.calendarNavigation.date,
    viewType: state.calendarNavigation.viewType
  }
}

export default connect (mapStateToProps, { movePrev, moveNext }) (CalendarNav);
