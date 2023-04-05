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

export { chart2, chart3 };
