import { localServer } from "./http";

const api = localServer();

async function chart2(companyId, success, fail) {
  await api
    .get("/result/survey/c2?companyId=" + companyId)
    .then(success)
    .catch(fail);
}
async function chart3(keywords, success, fail) {
  await api.post("/result/keyword/rank/", keywords).then(success).catch(fail);
}

async function chart3Survey(data, success, fail) {
  await api.post("/result/survey/c3", data).then(success).catch(fail);
}

async function chart4Survey(data, success, fail) {
  await api
    .get("/result/survey/c4?resultId=" + data)
    .then(success)
    .catch(fail);
}

async function chart5Survey(data1, data2, success, fail) {
  await api
    .get("/result/static?keywordId=" + data1 + "&gender=" + data2)
    .then(success)
    .catch(fail);
}

export { chart2, chart3, chart3Survey, chart4Survey, chart5Survey };
