from Dao import Rank as rDao
# from python_backend.Dao import Rank as rDao


class KeywordLogic:
    def __init__(self, result_id):
        self.cur = rDao.RankDao()
        self.result_id = result_id
        self.user_keyword = self.cur.get_keyword_data(result_id)
        print(self.user_keyword)
        self.user_keyword_idx = [key - 1 for key in self.user_keyword]  # 유저의 가치관 키워드를 받는다 3 / 10 (DB에서 가져오는 값)
        self.weight = [0.4, 0.3, 0.2]
        self.input_weight_pair = dict()
        for i in range(len(self.weight)):
            self.input_weight_pair[self.user_keyword_idx[i]] = self.weight[i]
        self.company_id_name = self.cur.get_companies_id()
        # 받은 가치관 키워드와 메인, 서브 키워드간의 연관도 매트릭스를 받는다. 2차원 배열로.
        # 0: 사회공헌, 1: 자율성, 2: 성장, 3: 안정성
        # self.sub_sim_array = self.get_sub_sim_array()
        # self.sub_sim_array = [
        #     [0.27, 0.24, 0.32, 0.28, 0.1, 0.2, 0.24, 0.23, 0.23, 0.21, 0.3, 0.21, 0.27, 0.26, 0.29, 0.22, 0.27, 0.28],
        #     [0.24, 0.17, 0.2, 0.22, 0.14, 0.27, 0.26, 0.24, 0.22, 0.21, 0.25, 0.23, 0.2, 0.21, 0.25, 0.25, 0.2, 0.24],
        #     [0.27, 0.19, 0.24, 0.26, 0.22, 0.27, 0.38, 0.35, 0.3, 0.28, 0.32, 0.33, 0.26, 0.29, 0.37, 0.36, 0.26, 0.31],
        #     [0.19, 0.19, 0.19, 0.17, 0.12, 0.19, 0.21, 0.13, 0.12, 0.16, 0.12, 0.19, 0.18, 0.16, 0.2, 0.21, 0.15, 0.18]
        #     ]
        # self.sub_tfidf_array = self.get_sub_tfidf_array()
        # self.sub_tfidf_array = [
        #     [0.31622777, 0.31622777, 0.31622777, 0, 0, 0, 0, 0.31622777, 0, 0.31622777, 0, 0.31622777, 0.31622777,
        #      0.31622777, 0.31622777, 0.31622777, 0, 0],
        #     [0, 0, 0, 0.42804604, 0, 0.5628291, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.42804604, 0.5628291],
        #     [0, 0, 0, 0.30650422, 0.40301621, 0, 0.40301621, 0, 0.40301621, 0, 0.40301621, 0, 0, 0, 0, 0, 0.30650422,
        #      0]]
        # self.sub_key_sim = self.value_company_sims(self.sub_tfidf_array, self.sub_sim_array)
        # self.sorted_final_score = dict(sorted(self.sub_key_sim.items(), key=lambda item: item[1], reverse=True))
        # self.answer_top = self.top_nth(3)
        # self.answer_bottom = self.bottom_nth(3)
        self.top_3 = dict()
        self.bottom_3 = dict()

        # self.value_keyword_top_bottom = self.get_keyword_importance(self.sub_sim_array, self.input_weight_pair)
        # self.value_keyword_top_bottom = self.get_keyword_importance()

    def get_keyword_importance(self, sub_sim_array, input_weight_pair):
        # 키워드 id와 중요도 값을 담을 딕셔너리. key가 키워드 id
        keyword_importance = {}
        # 키워드에 대해 하나씩 순회한다
        for word_idx in range(len(sub_sim_array[0])):
            score = 0
            for key in input_weight_pair.keys():
                # 가중치 값을 곱해준다
                score += input_weight_pair[key] * sub_sim_array[key][word_idx]
            keyword_importance[word_idx] = score
        # # 아이템 값 크기에 따라 소팅
        sorted_keyword_importance = dict(sorted(keyword_importance.items(), key=lambda item: item[1], reverse=True))
        print(sorted_keyword_importance)  # 이 값을 DB에 저장하면 됨
        # 상위, 하위 5개
        top_bottom_nth = 5
        top_nth_keys = list(sorted_keyword_importance.keys())[:top_bottom_nth]
        bottom_nth_keys = list(sorted_keyword_importance.keys())[-1: -top_bottom_nth - 1: -1]
        # 새 딕셔너리에 상하위 값 추가
        top_bottom_nth_dict = {}
        for key in top_nth_keys:
            top_bottom_nth_dict[key] = sorted_keyword_importance[key]
        for key in bottom_nth_keys:
            top_bottom_nth_dict[key] = sorted_keyword_importance[key]

        return top_bottom_nth_dict

    def value_company_sims(self):
        all_value_company_sim = dict()

        for user_keyword in self.user_keyword_idx:
            idx = 0
            tfidf_sim = self.cur.get_tfidf_sim_data(user_keyword)
            for company_id in tfidf_sim.keys():
                if company_id not in all_value_company_sim.keys():
                    all_value_company_sim[company_id] = sum(tfidf_sim[company_id]) * self.weight[idx]
                else:
                    all_value_company_sim[company_id] += sum(tfidf_sim[company_id]) * self.weight[idx]
            idx += 1

        result = dict(sorted(all_value_company_sim.items(), key=lambda x: x[1], reverse=True))
        self.top_3 = self.top_nth(result)
        self.bottom_3 = self.bottom_nth(result)
        self.insert_top_score('H')
        self.insert_top_score('T')
        return {'top': self.top_3, 'bottom': self.bottom_3}

    # 최상위 nth 기업 id와 함께 출력.
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

    #
    # # 서브 키워드 idx 불러오기
    # def get_sub_sim_array(self):
    #     result = list()
    #     choice_user_keyword_idx = [key+1 for key in self.user_keyword_idx]
    #     extracted_keyword_id = self.cur.get_extracted_keyword_id('S')
    #     # print(extracted_keyword_id)
    #     for idx in choice_user_keyword_idx:
    #         result.append(self.cur.get_sub_main_sim_score(idx, extracted_keyword_id))
    #     # print(result)
    #     # print(len(result))
    #     return result
    #
    # def get_sub_tfidf_array(self):
    #     result = list()
    #     extracted_keyword_id = self.cur.get_extracted_keyword_id('S')
    #     # print(self.company_id_name)
    #     for idx in self.company_id_name.keys():
    #         result.append(self.cur.get_companies_tfidf_sub_main(idx, extracted_keyword_id))
    #     # print(result)
    #     # print(len(result))
    #     return result
    #
    def insert_top_score(self, type):
        if type == 'H':
            for key in self.top_3.keys():
                data = [self.result_id, key, self.top_3[key], 'H']
                self.cur.insert_score(data)
        elif type == 'T':
            for key in self.bottom_3.keys():
                data = [self.result_id, key, self.bottom_3[key], 'T']
                self.cur.insert_score(data)


if __name__ == '__main__':
    a = KeywordLogic(2)
    # a= Rank()
    # print(a.get_main_tfidf_array())
    print(a.value_company_sims())
