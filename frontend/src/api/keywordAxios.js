import { localServer } from "./http"

const api = localServer();

async function getKeyword(success, fail){
    await api.get('/user/keyword').then(success).catch(fail);
}

async function postKeyword(userId, data, success, fail){
    await api.post('/user/keyword?userId=' + userId , data).then(success).catch(fail);
}

export { getKeyword, postKeyword };