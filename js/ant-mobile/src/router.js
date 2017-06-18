import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import MoIndexPage from "./routes/MoIndexPage.js";
import MyFoodPage from "./routes/MyFoodPage.js";
import MoSearchPage from "./routes/MoSearchPage.js";
import MediaQuery from 'react-responsive';

export default function ({ history }) {
  return (
    

<div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path='/' component={PCIndex}/>
             
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <Router history={history}>
          <Route path="/home" component={MoIndexPage} />
          <Route path="/MyFoodPage" component={MyFoodPage} />
          <Route path="/MoSearchPage" component={MoSearchPage} />
        </Router>
        </MediaQuery>
      </div>

       
  );
}
