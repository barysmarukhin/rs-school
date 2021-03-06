import React, { Component } from 'react';
import MonthViewWeek from './MonthViewWeek';
import DayNames from './DayNames';
import { connect } from 'react-redux';
import { changeView } from '../actions';

class MonthView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: props.dateFromState,
    };
  }
  componentWillMount() {
    this.props.changeView('month')
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      month: nextProps.dateFromState,
    });
  }
  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = this.state.month.clone().startOf("month").day("Sunday");//находим первый день месячного календаря
    let count = 0;
    let monthIndex = date.month();
    const {
      month
    } = this.state;
    while (!done) {
      weeks.push(
        <MonthViewWeek key={count}
          date={date.clone()}
          month={month}
        />
      );

      date.add(1, "w");//смещаемся на неделю вперед
      done = count++ > 2 && monthIndex !== date.month();//если текущая неделя как минимум четвертая и достигнут следующий месяц, выходим из цикла
      monthIndex = date.month();
    }
    return weeks;
  };

  render() {
    return (
      <section className="month-view">
        <DayNames />
        {this.renderWeeks()}
      </section>
    );
  }
}
function mapStateToProps(state) {
  return {
    dateFromState: state.calendarNavigation.date,
  }
}
export default connect (mapStateToProps, { changeView }) (MonthView);
