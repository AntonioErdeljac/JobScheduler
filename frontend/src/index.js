import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter} from "react-router-dom";

// renderamo Provder u kojem je store, BrowserRouter za react routanje i App componentu (indexRoute)


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();