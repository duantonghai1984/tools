import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import LoginPage from "./routes/LoginPage.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/LoginPage" component={LoginPage} />
    </Router>
  );
}

export default RouterConfig;
