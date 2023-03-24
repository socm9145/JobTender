from Dao import Rank as rDao


class Rank:
    def __init__(self, result_id, user_keyword_idx):
        self.cur = rDao.RankDao()
        self.result_id = result_id
        self.user_keyword_idx = [key-1 for key in user_keyword_idx]  # 유저의 가치관 키워드를 받는다 3 / 10 (DB에서 가져오는 값)
        self.weight = [0.4, 0.3, 0.2]
        self.input_weight_pair = dict()
        for i in range(len(self.weight)):
            self.input_weight_pair[self.user_keyword_idx[i]] = self.weight[i]
        self.company_id_name = self.cur.get_companies_id()
        # 받은 가치관 키워드와 메인, 서브 키워드간의 연관도 매트릭스를 받는다. 2차원 배열로.
        # 0: 사회공헌, 1: 자율성, 2: 성장, 3: 안정성
        # self.sub_sim_array = self.get_sub_sim_array()
        self.sub_sim_array = [
            [0.27, 0.24, 0.32, 0.28, 0.1, 0.2, 0.24, 0.23, 0.23, 0.21, 0.3, 0.21, 0.27, 0.26, 0.29, 0.22, 0.27, 0.28],
            [0.24, 0.17, 0.2, 0.22, 0.14, 0.27, 0.26, 0.24, 0.22, 0.21, 0.25, 0.23, 0.2, 0.21, 0.25, 0.25, 0.2, 0.24],
            [0.27, 0.19, 0.24, 0.26, 0.22, 0.27, 0.38, 0.35, 0.3, 0.28, 0.32, 0.33, 0.26, 0.29, 0.37, 0.36, 0.26, 0.31],
            [0.19, 0.19, 0.19, 0.17, 0.12, 0.19, 0.21, 0.13, 0.12, 0.16, 0.12, 0.19, 0.18, 0.16, 0.2, 0.21, 0.15, 0.18]
            ]
        # self.main_sim_array = self.get_main_sim_array()
        self.main_sim_array = [[0.42804604, 0, 0.5628291, 0, 0],
                  [0.30650422, 0.40301621, 0, 0.40301621, 0],
                  [0.31622777, 0, 0, 0, 0]
]
        # self.sub_tfidf_array = self.get_sub_tfidf_array()
        self.sub_tfidf_array = [
            [0.31622777, 0.31622777, 0.31622777, 0, 0, 0, 0, 0.31622777, 0, 0.31622777, 0, 0.31622777, 0.31622777,
             0.31622777, 0.31622777, 0.31622777, 0, 0],
            [0, 0, 0, 0.42804604, 0, 0.5628291, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.42804604, 0.5628291],
            [0, 0, 0, 0.30650422, 0.40301621, 0, 0.40301621, 0, 0.40301621, 0, 0.40301621, 0, 0, 0, 0, 0, 0.30650422,
             0]]
        # self.main_tfidf_array = self.get_main_tfidf_array()
        self.main_tfidf_array = [[0.42804604, 0, 0.5628291, 0, 0],
                            [0.30650422, 0.40301621, 0, 0.40301621, 0],
                            [0.31622777, 0, 0, 0, 0]]
        self.main_weight = 0.7
        self.sub_weight = 0.3
        self.main_key_sim = self.value_company_sims(self.main_tfidf_array, self.main_sim_array)
        self.sub_key_sim = self.value_company_sims(self.sub_tfidf_array, self.sub_sim_array)
        self.final_score = dict()
        for key in range(len(self.sub_key_sim)):
            score = self.main_weight * self.main_key_sim[key] + self.sub_weight * self.sub_key_sim[key]
            self.final_score[key+1] = score
        self.sorted_final_score = dict(sorted(self.final_score.items(), key=lambda item: item[1], reverse=True))
        self.answer_top = self.top_nth(3)
        self.answer_bottom = self.bottom_nth(3)

    def value_company_sims(self, tfidf_array, sim_array):
        all_value_company_sim = dict()
        # 기업을 순회하며 유사도를 계산한다
        for company_id in range(len(tfidf_array)):
            # 각 가치관에 대해 계산해준다.
            sim_score = 0
            for value_id in list(self.input_weight_pair.keys()):
                # 키워드들을 돌며 순회
                temp = 0
                # tf-idf 값과 가치관-서브/메인 키워드의 값을 곱해준다.
                for i in range(len(tfidf_array[0])):
                    temp += tfidf_array[company_id][i] * sim_array[value_id][i]
                # 곱한 값을 전부 더한다. 곱 해주는 값은 weight
                sim_score += temp * self.input_weight_pair[value_id]
            # 적합도 총점을 딕셔너리에 기업 id와 함께 저장한다.
            all_value_company_sim[company_id] = sim_score
        return all_value_company_sim

    # 최상위 nth 기업 id와 함께 출력.
    def top_nth(self, top_nth):
        top_nth_keys = list(self.sorted_final_score.keys())[:top_nth]
        top_nth_dict = {}
        for key in top_nth_keys:
            top_nth_dict[key] = self.sorted_final_score[key]
        return top_nth_dict

    # 최하위 nth 기업 id와 함께 출력.
    def bottom_nth(self, bottom_nth):
        bottom_nth_keys = list(self.sorted_final_score.keys())[-1: -bottom_nth-1: -1]
        bottom_nth_dict = {}
        for key in bottom_nth_keys:
            bottom_nth_dict[key] = self.sorted_final_score[key]
        return bottom_nth_dict

    def set_data(self):
        top = dict()
        bottom = dict()
        for i in self.answer_top.keys():
            top[self.company_id_name[i]] = self.answer_top[i]
        for i in self.answer_bottom.keys():
            bottom[self.company_id_name[i]] = self.answer_bottom[i]
        self.insert_top_score('H', self.result_id, self.answer_top)
        self.insert_top_score('T', self.result_id, self.answer_bottom)
        return {'top': top, 'bottom': bottom}

    # 서브 키워드 idx 불러오기
    def get_sub_sim_array(self):
        result = list()
        choice_user_keyword_idx = [key+1 for key in self.user_keyword_idx]
        extracted_keyword_id = self.cur.get_extracted_keyword_id('S')
        for idx in choice_user_keyword_idx:
            result.append(self.cur.get_sub_main_sim_score(idx, extracted_keyword_id))
        return result

    # 메인 키워드 idx 불러오기
    def get_main_sim_array(self):
        result = list()
        choice_user_keyword_idx = [key+1 for key in self.user_keyword_idx]
        extracted_keyword_id = self.cur.get_extracted_keyword_id('M')
        for idx in choice_user_keyword_idx:
            result.append(self.cur.get_sub_main_sim_score(idx, extracted_keyword_id))
        return result

    def get_sub_tfidf_array(self):
        result = list()
        # self.company_id_name = self.cur.get_companies_id()
        extracted_keyword_id = self.cur.get_extracted_keyword_id('S')
        for idx in self.company_id_name.keys():
            result.append(self.cur.get_companies_tfidf_sub_main(idx, extracted_keyword_id))
        return result

    def get_main_tfidf_array(self):
        result = list()
        extracted_keyword_id = self.cur.get_extracted_keyword_id('M')
        # print(extracted_keyword_id)
        # print(self.company_id_name)
        for idx in self.company_id_name.keys():
            result.append(self.cur.get_companies_tfidf_sub_main(idx, extracted_keyword_id))
        return result

    def insert_top_score(self, type, result_id, dic):
        if type == 'H':
            for key in dic.keys():
                data = [result_id, key, dic[key], 'H']
                self.cur.insert_score(data)
        elif type == 'T':
            for key in dic.keys():
                data = [result_id, key, dic[key], 'T']
                self.cur.insert_score(data)


if __name__ == '__main__':
    a = Rank(7, [1, 2, 3])
    # print(a.get_main_tfidf_array())
    print(a.set_data())