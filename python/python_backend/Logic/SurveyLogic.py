from Dao import Rank as rDao
# from python_backend.Dao import Rank as rDao

class SurveyLogic:
    def __init__(self, result_id):
        self.cur = rDao.RankDao()
        self.result_id = result_id
        # survey_result 테이블에서 result_id 값을 where을 통해서 뽑아온다
        self.survey_data = self.cur.get_survey_data(result_id)
        self.weight = self.get_weight()
        self.top_3 = dict()
        self.bottom_3 = dict()

    def get_weight(self):
        # 1. 안정
        safety = self.survey_data[7] + self.survey_data[8] + self.survey_data[13] + self.survey_data[15] \
                 + self.survey_data[22] + self.survey_data[42] + self.survey_data[56]
        mean_safety = safety / 7
        # 2. 규범
        norms = self.survey_data[11] + self.survey_data[18] + self.survey_data[20] + self.survey_data[40]\
                + self.survey_data[47]
        mean_norms = norms / 5
        # 3. 전통
        tradition = self.survey_data[32] + self.survey_data[36] + self.survey_data[44] + self.survey_data[51]
        mean_tradition = tradition / 4
        # 4. 애정
        love = self.survey_data[6] + self.survey_data[10] + self.survey_data[19] + self.survey_data[28]\
               + self.survey_data[33] + self.survey_data[45] + self.survey_data[49] + self.survey_data[52]\
               + self.survey_data[54]
        mean_love = love / 9
        # 5. 박애
        benevolence = self.survey_data[1] + self.survey_data[2] + self.survey_data[17] + self.survey_data[24]\
                      + self.survey_data[26] + self.survey_data[29] + self.survey_data[30] + self.survey_data[35]\
                      + self.survey_data[38]
        mean_benevolence = benevolence / 9
        # 6. 자율
        oneself = self.survey_data[5] + self.survey_data[14] + self.survey_data[16] + self.survey_data[21]\
                  + self.survey_data[31] + self.survey_data[41] + self.survey_data[53]
        mean_oneself = oneself / 7
        # 7. 재미
        fun = self.survey_data[9] + self.survey_data[25] + self.survey_data[37]
        mean_fun = fun / 3
        # 8. 쾌락
        hedonism = self.survey_data[4] + self.survey_data[50] + self.survey_data[57]
        mean_hedonism = hedonism / 3
        # 9. 성취
        achieve = self.survey_data[34] + self.survey_data[39] + self.survey_data[43] + self.survey_data[48]\
                  + self.survey_data[55]
        mean_achieve = achieve / 5
        # 10. 지위
        status = self.survey_data[3] + self.survey_data[12] + self.survey_data[23] + self.survey_data[27]\
                 + self.survey_data[46]
        mean_status = status / 5

        return [mean_safety, mean_norms, mean_tradition, mean_love, mean_benevolence, mean_oneself, mean_fun,
                mean_hedonism, mean_achieve, mean_status]

    def value_company_sims(self):
        all_value_company_sim = dict()
        for keyword_id in self.survey_data.keys():
            idx = 0
            tfidf_sim = self.cur.get_tfidf_sim_data(keyword_id)
            for company_id in tfidf_sim.keys():
                if company_id not in all_value_company_sim.keys():
                    all_value_company_sim[company_id] = sum(tfidf_sim[company_id]) * self.weight[idx]
                else:
                    all_value_company_sim[company_id] += sum(tfidf_sim[company_id]) * self.weight[idx]
            idx += 1

        result = dict(sorted(all_value_company_sim.items(), key=lambda x: x[1], reverse=True))
        self.top_3 = self.top_nth(result)
        self.bottom_3 = self.bottom_nth(result)
        # self.insert_top_bottom_score('H')
        # self.insert_top_bottom_score('T')
        return {'top': self.top_3, 'bottom': self.bottom_3}

    def top_nth(self, top_nth):
        top_nth_keys = list(top_nth.keys())[:3]
        top_nth_dict = {}
        for key in top_nth_keys:
            top_nth_dict[key] = top_nth[key]
        return top_nth_dict

    # 최하위 nth 기업 id와 함께 출력.
    def bottom_nth(self, bottom_nth):
        bottom_nth_keys = list(bottom_nth.keys())[-3:]
        bottom_nth_dict = {}
        for key in bottom_nth_keys:
            bottom_nth_dict[key] = bottom_nth[key]
        return bottom_nth_dict

    def insert_top_bottom_score(self, type):
        if type == 'H':
            for company_id in self.top_3.keys():
                data = ['H', self.top_3[company_id], company_id, self.result_id]
                self.cur.insert_survey_score(data)
        elif type == 'T':
            for company_id in self.bottom_3.keys():
                data = ['T', self.bottom_3[company_id], company_id, self.result_id]
                self.cur.insert_survey_score(data)


if __name__ == '__main__':
    a = SurveyLogic(35)
    print(a.value_company_sims())
