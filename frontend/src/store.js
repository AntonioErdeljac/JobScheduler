import {createStore, applyMiddleware, combineReducers} from "redux";
import {promiseMiddleware, userStatusMiddleware} from "./middleware";

//store kao zasebna datoteka radi preglednosti, spaja sve reducere, primjenjuje Middlewareove

import auth from "./reducers/auth";
import jobs from "./reducers/jobs";
import common from "./reducers/common";
import editor from "./reducers/editor";

const reducer = combineReducers({
    auth,
    jobs,
    common,
    editor
});

const store = createStore(reducer, applyMiddleware(promiseMiddleware, userStatusMiddleware));

export default store;