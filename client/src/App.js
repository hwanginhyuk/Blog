import React from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import MyRouter from "./routes/Router";

import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/custom.scss"

const App = () => {
  return (
    // 상태관리를 최상단에 올리는 구조
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MyRouter/>
      </ConnectedRouter>
      
    </Provider>
  ) 
}

export default App;
