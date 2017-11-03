import {createStore, applyMiddleware, combineReducers} from "redux";
import {promiseMiddleware} from "./middleware";

//store kao zasebna datoteka radi preglednosti, spaja sve reducere, primjenjuje Middlewareove

import auth from "./reducers/auth";
import jobs from "./reducers/jobs";
import common from "./reducers/common";

const reducer = combineReducers({
    auth,
    jobs,
    common
});

const store = createStore(reducer, applyMiddleware(promiseMiddleware));

export default store;