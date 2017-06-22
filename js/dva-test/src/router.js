import React from 'react';
import { Router, Route } from 'dva/router';

import SearchPage from "./routes/SearchPage.js";

import QueryPageTest from "./routes/QueryPageTest.js";

import CluserUpdatePage from "./routes/CluserUpdatePage.js";

import SelectPage from "./routes/SelectPage.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={SearchPage} />
      <Route path="/QueryPageTest" component={QueryPageTest} />
      <Route path="/CluserUpdatePage" component={CluserUpdatePage} />
      <Route path="/SelectPage" component={SelectPage} />
    </Router>
  );
}

export default RouterConfig;
