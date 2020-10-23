import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { sessionService } from "redux-react-session";

import reducers from "./reducers/index";

import App from "./components/App";
import ErrorSnackbar from "./components/ErrorSnackbar/ErrorSnackbar";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

sessionService.initSessionService(store);

ReactDOM.render(
  <Provider store={store}>
    <ErrorSnackbar />
    <App />
  </Provider>,
  document.querySelector("#root")
);
