import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import { logger } from '?redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createHashHistory } from 'history'
import reducers from 'redux/reducers'
import sagas from 'redux/sagas'
import App from 'app'
import axios from 'axios';
import Localization from 'components/LayoutComponents/Localization'
import * as serviceWorker from './serviceWorker'

// app styles
import './global.scss'


axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const history = createHashHistory()
const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const middlewares = [thunk, sagaMiddleware, routeMiddleware]
if (process.env.NODE_ENV === 'development' && true) {
  // middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers(history), composeEnhancers(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <Localization>
      <App history={history} />
    </Localization>
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.register()
export { store, history }
