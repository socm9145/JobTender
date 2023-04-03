# DB에서 받아야함. 받는 데이터 형식 딕셔너리. {survey_id : score, survey_id : score}
########
survey_data = {1: 9, 2: 4, 3: 1}
#########
# 1. 안정
safety = survey_data[7] + survey_data[8] + survey_data[13] + survey_data[15] + survey_data[22] \
         + survey_data[42] + survey_data[56]
mean_safety = safety / 7
# 2. 규범
norms = survey_data[11] + survey_data[18] + survey_data[20] + survey_data[40] + survey_data[47]
mean_norms = norms / 5
# 3. 전통
tradition = survey_data[32] + survey_data[36] + survey_data[44] + survey_data[51]
mean_tradition = tradition / 4
# 4. 애정
love = survey_data[6] + survey_data[10] + survey_data[19] + survey_data[28] + survey_data[33] + survey_data[45] \
       + survey_data[49] + survey_data[52] + survey_data[54]
mean_love = love / 9
# 5. 박애
benevolence = survey_data[1] + survey_data[2] + survey_data[17] + survey_data[24] + survey_data[26] + survey_data[29]\
        + survey_data[30] + survey_data[35] + survey_data[38]
mean_benevolence = benevolence / 9
# 6. 자율
oneself = survey_data[5] + survey_data[14] + survey_data[16] + survey_data[21] + survey_data[31] \
          + survey_data[41] + survey_data[53]
mean_oneself = oneself / 7
# 7. 재미
fun = survey_data[9] + survey_data[25] + survey_data[37]
mean_fun = fun / 3
# 8. 쾌락
hedonism = survey_data[4] + survey_data[50] + survey_data[57]
mean_hedonism = hedonism / 3
# 9. 성취
achieve = survey_data[34] + survey_data[39] + survey_data[43] + survey_data[48] + survey_data[55]
mean_achieve = achieve / 5
# 10. 지위
status = survey_data[3] + survey_data[12] + survey_data[23] + survey_data[27] + survey_data[46]
mean_status = status / 5

# 가중치. 순서 중요.
weight = [mean_safety, mean_norms, mean_tradition, mean_love, mean_benevolence, mean_oneself, mean_fun, mean_hedonism,
          mean_achieve, mean_status]

### 분석 ###
# DB에서 10개 가치관과 키워드 간의 유사도를 받는다. 리스트의 0번째 아이템은 value_id 1, 즉 안정에 대한 것이어야 함
value_word_sim_array = [[0.27, 0.24, 0.32, 0.28, 0.1, 0.2, 0.24, 0.23, 0.23, 0.21, 0.3, 0.21, 0.27, 0.26, 0.29, 0.22, 0.27, 0.28],
             [0.24, 0.17, 0.2, 0.22, 0.14, 0.27, 0.26, 0.24, 0.22, 0.21, 0.25, 0.23, 0.2, 0.21, 0.25, 0.25, 0.2, 0.24],
             [0.27, 0.19, 0.24, 0.26, 0.22, 0.27, 0.38, 0.35, 0.3, 0.28, 0.32, 0.33, 0.26, 0.29, 0.37, 0.36, 0.26, 0.31],
             [0.19, 0.19, 0.19, 0.17, 0.12, 0.19, 0.21, 0.13, 0.12, 0.16, 0.12, 0.19, 0.18, 0.16, 0.2, 0.21, 0.15, 0.18],
             [0.24, 0.17, 0.2, 0.22, 0.14, 0.27, 0.26, 0.24, 0.22, 0.21, 0.25, 0.23, 0.2, 0.21, 0.25, 0.25, 0.2, 0.24],
             [0.27, 0.19, 0.24, 0.26, 0.22, 0.27, 0.38, 0.35, 0.3, 0.28, 0.32, 0.33, 0.26, 0.29, 0.37, 0.36, 0.26, 0.31],
             [0.19, 0.19, 0.19, 0.17, 0.12, 0.19, 0.21, 0.13, 0.12, 0.16, 0.12, 0.19, 0.18, 0.16, 0.2, 0.21, 0.15, 0.18],
             [0.24, 0.17, 0.2, 0.22, 0.14, 0.27, 0.26, 0.24, 0.22, 0.21, 0.25, 0.23, 0.2, 0.21, 0.25, 0.25, 0.2, 0.24],
             [0.27, 0.19, 0.24, 0.26, 0.22, 0.27, 0.38, 0.35, 0.3, 0.28, 0.32, 0.33, 0.26, 0.29, 0.37, 0.36, 0.26, 0.31],
             [0.19, 0.19, 0.19, 0.17, 0.12, 0.19, 0.21, 0.13, 0.12, 0.16, 0.12, 0.19, 0.18, 0.16, 0.2, 0.21, 0.15, 0.18]
]
# DB에서 기업의 메인, 서브키워드 tf-idf를 받는다.
sub_tfidf_array = [[0.31622777, 0.31622777, 0.31622777, 0, 0, 0, 0, 0.31622777, 0, 0.31622777, 0, 0.31622777, 0.31622777, 0.31622777, 0.31622777, 0.31622777, 0, 0],
                   [0, 0, 0, 0.42804604, 0, 0.5628291, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.42804604, 0.5628291],
                   [0, 0, 0, 0.30650422, 0.40301621, 0, 0.40301621, 0, 0.40301621, 0, 0.40301621, 0, 0, 0, 0, 0, 0.30650422, 0],
                    [0.31622777, 0.31622777, 0.31622777, 0, 0, 0, 0, 0.31622777, 0, 0.31622777, 0, 0.31622777, 0.31622777, 0.31622777, 0.31622777, 0.31622777, 0, 0],
                   [0, 0, 0, 0.42804604, 0, 0.5628291, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.42804604, 0.5628291],
                   [0, 0, 0, 0.30650422, 0.40301621, 0, 0.40301621, 0, 0.40301621, 0, 0.40301621, 0, 0, 0, 0, 0, 0.30650422, 0],
                    [0.31622777, 0.31622777, 0.31622777, 0, 0, 0, 0, 0.31622777, 0, 0.31622777, 0, 0.31622777, 0.31622777, 0.31622777, 0.31622777, 0.31622777, 0, 0],
                   [0, 0, 0, 0.42804604, 0, 0.5628291, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.42804604, 0.5628291],
                   [0, 0, 0, 0.30650422, 0.40301621, 0, 0.40301621, 0, 0.40301621, 0, 0.40301621, 0, 0, 0, 0, 0, 0.30650422, 0],
                    [0.31622777, 0.31622777, 0.31622777, 0, 0, 0, 0, 0.31622777, 0, 0.31622777, 0, 0.31622777, 0.31622777, 0.31622777, 0.31622777, 0.31622777, 0, 0],
]


def value_company_sims(tfidf_array, sim_array):
    all_value_company_sim = {}
    # 기업을 순회하며 유사도를 계산한다 # 0번부터 58번까지
    for company_id in range(len(tfidf_array)):
        # 각 가치관에 대해 계산해준다.
        sim_score = 0
        for value_id in range(10):
        # for value_id in list(input_weight_pair.keys()):
            # 키워드들을 돌며 순회
            temp = 0
            # tf-idf 값과 가치관-서브키워드의 값을 곱해준다.
            for i in range(len(tfidf_array[0])):
                temp += tfidf_array[company_id][i] * sim_array[value_id][i]
            # weight를 곱한 값을 전부 더해 기업 유사도 점수를 얻는다.
            sim_score += temp * weight[value_id]
        # 적합도 총점을 딕셔너리에 기업 id와 함께 저장한다.
        all_value_company_sim[company_id+1] = sim_score
    return all_value_company_sim


# 유사도 크기순 정렬
sim_scores = value_company_sims(sub_tfidf_array, value_word_sim_array)
sorted_sim_scores = dict(sorted(sim_scores.items(), key=lambda item: item[1], reverse=True))

# 최상위 nth 기업 id와 함께 출력.
def top_nth(final_score, top_nth):
    top_nth_keys = list(final_score.keys())[:top_nth]
    top_nth_dict = {}
    for key in top_nth_keys:
        top_nth_dict[key] = final_score[key]
    return top_nth_dict

# 기업과 나에 대한 상위
print(top_nth(sorted_sim_scores, 3))   # 슷자 바뀔 수 있음. 5개 보고 싶으면 5, 3개 보고 싶으면 3.

# 최하위 nth 기업 id와 함께 출력.
def bottom_nth(final_score, bottom_nth):
    bottom_nth_keys = list(final_score.keys())[-1: -bottom_nth-1: -1]
    bottom_nth_dict = {}
    for key in bottom_nth_keys:
        bottom_nth_dict[key] = final_score[key]
    return bottom_nth_dict

# 기업과 나에 대한 하위
print(bottom_nth(sorted_sim_scores, 3))    # 슷자 바뀔 수 있음. 5개 보고 싶으면 5, 3개 보고 싶으면 3.
