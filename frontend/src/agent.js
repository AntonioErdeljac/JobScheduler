import _superagent from "superagent";
import superagentPromise from "superagent-promise";

const superagent = superagentPromise(_superagent, global.Promise);

const getBody = res => res.body;

const API_ROOT = '//localhost:8000/restapi';

const requests = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).then(getBody)
};

const Jobs = {
    all: () =>
        requests.get(`/jobs`)
};

export default {
    Jobs
};