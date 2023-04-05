import { localServer, pythonServer } from "./http"

const api = localServer();
const apiv2 = pythonServer();


async function submitSurvey(success, fail){
    await api.get('/result/survey').then(success).catch(fail);
}

async function makeResult(userId, success, fail){
    await api.get('/user/result?userId=' + userId).then(success).catch(fail);
}

async function saveChooseSurvey(data, success, fail){
    await api.post('/user/survey', data).then(success).catch(fail);
}

async function postSurvey(resultId, success, fail){
    await apiv2.get('/result/survey/' + resultId).then(success).catch(fail);
}

export { submitSurvey, makeResult, postSurvey, saveChooseSurvey };