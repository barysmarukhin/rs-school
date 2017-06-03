import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './containers/App';
import MonthView from './components/MonthView';
import WeekView from './components/WeekView';
import DayView from './components/DayView';
import AgendaView from './components/AgendaView';
import reducer from './reducers';
import './index.css';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const history = syncHistoryWithStore(hashHistory, store);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={MonthView}/>
        <Route path='/month-view' component={MonthView}/>
        <Route path='/week-view' component={WeekView}/>
        <Route path='/day-view' component={DayView}/>
        <Route path='/agenda-view' component={AgendaView}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
