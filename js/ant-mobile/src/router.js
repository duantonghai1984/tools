import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import MoIndexPage from "./routes/MoIndexPage.js";
import MyFoodPage from "./routes/MyFoodPage.js";
import MoSearchPage from "./routes/MoSearchPage.js";

export default function ({ history }) {
  return (
          <Router history={history}>
          <Route path="/home" component={MoIndexPage} />
          <Route path="/MyFoodPage" component={MyFoodPage} />
          <Route path="/MoSearchPage" component={MoSearchPage} />
        </Router>
  );
}
