//stvaram custom middleware koji ovisno o responsu ili erroru stavlja vrijednosti u action.payload
//action.payload kasnije zovemo u svakom reduceru koji fetcha nesto tipa (action.payload.jobs)

const promiseMiddleware = store => next => action => {
    if(isPromise(action.payload)){
        store.dispatch({type: 'ASYNC_START', subtype: action.type}); //ovo služi da bi blokiralo login & register button dok se ne fetcha do kraja (radi spama)
        action.payload.then(
            res => {
                action.payload = res;
                store.dispatch(action);
            },
            error => {
                action.error = true;
                action.payload = error.response.body;
                store.dispatch(action);
            }
        );
        return;
    }
    next(action);
};

function isPromise(v){
    return v && typeof v.then === 'function';
}

export {promiseMiddleware};