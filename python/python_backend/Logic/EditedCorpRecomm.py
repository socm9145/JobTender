class Rank:
    def __init__(self):
        self.user_keyword_idx = [0, 1, 2]  # 유저의 가치관 id를 받는다. range: 1~10. 3 / 10 (DB에서 가져오는 값)
        self.weight = [0.4, 0.3, 0.2]
        self.input_weight_pair = dict()
        for i in range(len(self.weight)):
            self.input_weight_pair[self.user_keyword_idx[i]] = self.weight[i]

        # 받은 가치관 키워드와 메인, 서브 키워드간의 연관도 매트릭스를 받는다. 2차원 배열로.
        # 0: 사회공헌, 1: 자율성, 2: 성장, 3: 안정성
        self.sub_sim_array = [
            [0.27, 0.24, 0.32, 0.28, 0.1, 0.2, 0.24, 0.23, 0.23, 0.21, 0.3, 0.21, 0.27, 0.26, 0.29, 0.22, 0.27, 0.28],
            [0.24, 0.17, 0.2, 0.22, 0.14, 0.27, 0.26, 0.24, 0.22, 0.21, 0.25, 0.23, 0.2, 0.21, 0.25, 0.25, 0.2, 0.24],
            [0.27, 0.19, 0.24, 0.26, 0.22, 0.27, 0.38, 0.35, 0.3, 0.28, 0.32, 0.33, 0.26, 0.29, 0.37, 0.36, 0.26, 0.31],
            [0.19, 0.19, 0.19, 0.17, 0.12, 0.19, 0.21, 0.13, 0.12, 0.16, 0.12, 0.19, 0.18, 0.16, 0.2, 0.21, 0.15, 0.18]]
        # self.main_sim_array = [
        #     [0.42804604, 0, 0.5628291, 0, 0],
        #     [0.30650422, 0.40301621, 0, 0.40301621, 0],
        #     [0.31622777, 0, 0, 0, 0]]
        # self.sub_vocab_set = {'경쟁력': 0, '글로벌': 1, '다양성': 2, '도전': 3, '두뇌활동': 4, '성장': 5, '역량': 6,
        #                       '열정': 7, '의욕적': 8, '의지': 9, '자발적': 10, '전문성': 11, '정직': 12, '창의': 13,
        #                       '최선': 14, '학습': 15, '혁신': 16, '협업': 17}
        self.sub_tfidf_array = [
            [0.31622777, 0.31622777, 0.31622777, 0, 0, 0, 0, 0.31622777, 0, 0.31622777, 0, 0.31622777, 0.31622777, 0.31622777, 0.31622777, 0.31622777, 0, 0],
            [0, 0, 0, 0.42804604, 0, 0.5628291, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.42804604, 0.5628291],
            [0, 0, 0, 0.30650422, 0.40301621, 0, 0.40301621, 0, 0.40301621, 0, 0.40301621, 0, 0, 0, 0, 0, 0.30650422, 0]]
        # self.main_tfidf_array = [
        #     [0.42804604, 0, 0.5628291, 0, 0],
        #     [0.30650422, 0.40301621, 0, 0.40301621, 0],
        #     [0.31622777, 0, 0, 0, 0]]
        # self.main_weight = 0.7
        # self.sub_weight = 0.3
        # self.main_key_sim = self.value_company_sims(self.main_tfidf_array, self.main_sim_array)
        self.sub_key_sim = self.value_company_sims(self.sub_tfidf_array, self.sub_sim_array)
        # self.final_score = dict()
        # for key in range(len(self.sub_key_sim)):
        #     score = self.main_weight * self.main_key_sim[key] + self.sub_weight * self.sub_key_sim[key]
        #     self.final_score[key] = score
        # self.sorted_final_score = dict(sorted(self.final_score.items(), key=lambda item: item[1], reverse=True))
        self.sorted_final_score = dict(sorted(self.sub_key_sim.items(), key=lambda item: item[1], reverse=True))
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
        return {'top': self.answer_top, 'bottom': self.answer_bottom}


if __name__ == '__main__':
    a = Rank()
    print(a.set_data())