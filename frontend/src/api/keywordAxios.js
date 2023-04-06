import { localServer, pythonServer } from "./http"

const api = localServer();
const apiv2 = pythonServer();

async function getKeyword(success, fail){
    await api.get('/user/keyword').then(success).catch(fail);
}

async function postKeyword(userId, data, success, fail){
    await api.post('/user/keyword?userId=' + userId , data).then(success).catch(fail);
}

async function postKeywordPython(resultId, success, fail) {
    await apiv2.get('/result/keyword/' + resultId).then(success).catch(fail);
}

export { getKeyword, postKeyword, postKeywordPython, apiv2 };