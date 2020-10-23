import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import SignIn from "./SignIn/SignIn";
import Profile from "./Profile/Profile";
import CommodityTypes from './CommodityTypes/CommodityTypes';

import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      {/* <BrowserRouter history={history}> */}
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/profile" exact component={Profile} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/commodity_types" exact component={CommodityTypes} />
            <Redirect from="/" to="/profile" />
          </Switch>
        </div>
        </Router>
       {/* </BrowserRouter> */}
    </div>
  );
};

export default App;
