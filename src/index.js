import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import reducers from "./reducers/index";
import registerServiceWorker from "./registerServiceWorker";
import ListForm from "./components/ListForm";
import Lists from "./components/Lists";

const createStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const Index = () => (
  /* Provider for Reducer */
  <Provider store={createStoreMiddleware(reducers)}>
    <div className="grid">
      <ListForm />
      <Lists />
    </div>
  </Provider>
);

/* All React components showing in tag id="root" */
ReactDOM.render(<Index />, document.getElementById("root"));
registerServiceWorker();
