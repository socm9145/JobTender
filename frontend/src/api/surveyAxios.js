import { localServer } from "./http"

const api = localServer();


async function submitSurvey(success, fail){
    await api.get('/result/survey').then(success).catch(fail);
}

async function makeResult(userId, success, fail){
    await api.get('/user/result?userId=' + userId).then(success).catch(fail);
}

async function postKeyword(userId, data, success, fail){
    await api.post('/user/keyword?userId=' + userId , data).then(success).catch(fail);
}

export { submitSurvey, makeResult };