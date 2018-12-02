import * as React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from '../containers/Home';

const Main = () => (
  <Router>
    <Route path='/' exact component={Home} />
  </Router>
);

export default Main;
