import { localServer } from "./http"

const api = localServer();

async function login(code, success, fail){
    await api.get('/account/auth/kakao/callback?code=' + code).then(success).catch(fail);
}

async function reissue(success, fail){
    await api.get('/account/reissue').then(success).catch(fail);
}

async function logout(success, fail){
    await api.get('/account/logout').then(success).catch(fail);
}

export { login, reissue, logout };