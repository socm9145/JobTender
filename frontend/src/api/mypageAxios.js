import { localServer } from "./http"

const api = localServer();

async function userinfo(userId, success, fail){
    await api.get('/user/info?userId=' + userId).then(success).catch(fail);
}

async function userhistory(userId, success, fail){
    await api.get('/user/history?userId=' + userId).then(success).catch(fail);
}

async function keyword(success, fail){
    await api.get('/user/keyword').then(success).catch(fail);
}
export { userinfo, userhistory, keyword };