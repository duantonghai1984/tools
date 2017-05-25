import React from 'react';
import { Router, Route } from 'dva/router';

import SearchPage from "./routes/SearchPage.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={SearchPage} />
    </Router>
  );
}

export default RouterConfig;
