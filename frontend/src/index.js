import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {createStore, applyMiddleware, combineReducers} from "redux";
import {promiseMiddleware} from "./middleware";

const reducer = (state={}, action) => {
    switch(action.type){
    case 'MAIN_PAGE_LOADED':
        return {
            ...state,
            jobs: action.payload.jobs
        };
    }
    return state;
};

const store = createStore(reducer, applyMiddleware(promiseMiddleware));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
