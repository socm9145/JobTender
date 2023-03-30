import { localServer } from "./http"

const api = localServer();

async function userinfo(success, fail){
    await api.get('/user/info').then(success).catch(fail);
}

export { userinfo };