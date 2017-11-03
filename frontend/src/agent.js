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
        superagent.get(`${API_ROOT}${url}`).then(getBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).then(getBody)
};

const Jobs = {
    all: () =>
        requests.get(`/jobs`)
};

const Auth = {
    login: (email, password) =>
        requests.post('/users/login', {user: {email, password}})
};

export default {
    Jobs,
    Auth
};