import _superagent from "superagent";
import superagentPromise from "superagent-promise";


//stvaramo superagent koji ce nam sluzit kao fetchanje ruta, postavili smo glavni APIROOT te na njega
// dodajemo nastavke, koristimo tokenPlugin kako bi osigurali headers token u authorization keyu
// alternativa bi bila axios ili fetch ali naviknut sam na ovo


const superagent = superagentPromise(_superagent, global.Promise);

const getBody = res => res.body;

const API_ROOT = '//localhost:8000/restapi';

const requests = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(getBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(getBody)
};

const Jobs = {
    all: () =>
        requests.get(`/jobs`),
    completed: () =>
        requests.get(`/jobs/completed`),
    scheduled: () =>
        requests.get(`/jobs/scheduled`),
    myJobs: (username) =>
        requests.get(`/jobs/myjobs`),
    new: (title, schedule) =>
        requests.post(`/jobs`, {job: {title, schedule}})
};

const Auth = {
    login: (email, password) =>
        requests.post('/users/login', {user: {email, password}}),
    current: () =>
        requests.get(`/user`),
    register: (username, email, password) =>
        requests.post(`/users`, {user: {username, email, password}})
};

//brza funkcija setToken spremi token jos uz window.localStorage (to middleware radi)
// u agent propertie

let token = null;



let tokenPlugin = req => {
    if(token){
        req.set('authorization', `Token ${token}`);
    }
};

export default {
    Jobs,
    Auth,
    setToken: _token => {token = _token}
};