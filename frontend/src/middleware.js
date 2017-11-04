//stvaram custom middleware koji ovisno o responsu ili erroru stavlja vrijednosti u action.payload
//action.payload kasnije zovemo u svakom reduceru koji fetcha nesto tipa (action.payload.jobs)
import agent from "./agent";

const promiseMiddleware = store => next => action => {
    if(isPromise(action.payload)){
        store.dispatch({type: 'ASYNC_START', subtype: action.type}); //ovo služi da bi blokiralo login & register button dok se ne fetcha do kraja (radi spama)
        action.payload.then(
            res => {
                action.payload = res;
                store.dispatch(action);
            },
            error => {
                console.log(error, 'UHVATIO SAM ERROR');
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

// stvaranje middlewarea koji postavlja token u localstorage, to sluzi da se korisnik ne mora
// svaki put loginati vec zapamti odnosno spremi jednom kad se logina (token sam po sebi expira nakon 60 dana u backendu)

const userStatusMiddleware = store => next => action => {
    if(action.type === 'LOGIN' || action.type === 'REGISTER'){
        if(!action.error){
            window.localStorage.setItem('jwt', action.payload.user.token);
            agent.setToken(action.payload.user.token);
        }
    } else if(action.type === 'LOGOUT'){
        window.localStorage.setItem('jwt', '');
        agent.setToken(null);
    }
    next(action);
};

export {promiseMiddleware, userStatusMiddleware};