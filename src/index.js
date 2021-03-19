import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/Reducers/auth';
import SignUpReducer from './store/Reducers/signup';
import EventsReducer from './store/Reducers/event';
import ProfileReducer from './store/Reducers/profile';
import MyFundReducer from './store/Reducers/myFund';
import oneFundReducer from './store/Reducers/oneEvent';
import MyBillsReducer from './store/Reducers/getBills';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth:authReducer,signup:SignUpReducer, events:EventsReducer,profile:ProfileReducer,myFund:MyFundReducer,oneEvent:oneFundReducer,myBills:MyBillsReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
