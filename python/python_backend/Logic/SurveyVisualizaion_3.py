# # DB에서 받아야함. 받는 데이터 형식 딕셔너리. {survey_id : score, survey_id : score}
# ########
# survey_data = {1: 9, 2: 4, 3: 1}
# #########
# # 1. 안정
# safety = survey_data[7] + survey_data[8] + survey_data[13] + survey_data[15] + survey_data[22] \
#          + survey_data[42] + survey_data[56]
# mean_safety = safety / 7
# # 2. 규범
# norms = survey_data[11] + survey_data[18] + survey_data[20] + survey_data[40] + survey_data[47]
# mean_norms = norms / 5
# # 3. 전통
# tradition = survey_data[32] + survey_data[36] + survey_data[44] + survey_data[51]
# mean_tradition = tradition / 4
# # 4. 애정
# love = survey_data[6] + survey_data[10] + survey_data[19] + survey_data[28] + survey_data[33] + survey_data[45] \
#        + survey_data[49] + survey_data[52] + survey_data[54]
# mean_love = love / 9
# # 5. 박애
# benevolence = survey_data[1] + survey_data[2] + survey_data[17] + survey_data[24] + survey_data[26] + survey_data[29]\
#         + survey_data[30] + survey_data[35] + survey_data[38]
# mean_benevolence = benevolence / 9
# # 6. 자율
# oneself = survey_data[5] + survey_data[14] + survey_data[16] + survey_data[21] + survey_data[31] \
#           + survey_data[41] + survey_data[53]
# mean_oneself = oneself / 7
# # 7. 재미
# fun = survey_data[9] + survey_data[25] + survey_data[37]
# mean_fun = fun / 3
# # 8. 쾌락
# hedonism = survey_data[4] + survey_data[50] + survey_data[57]
# mean_hedonism = hedonism / 3
# # 9. 성취
# achieve = survey_data[34] + survey_data[39] + survey_data[43] + survey_data[48] + survey_data[55]
# mean_achieve = achieve / 5
# # 10. 지위
# status = survey_data[3] + survey_data[12] + survey_data[23] + survey_data[27] + survey_data[46]
# mean_status = status / 5
#
# # 가중치. 순서 중요.
# weight = [mean_safety, mean_norms, mean_tradition, mean_love, mean_benevolence, mean_oneself, mean_fun, mean_hedonism,
#           mean_achieve, mean_status]
weight = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# DB에서 가치관과 단어간의 연관도를 구한다
value_word_sim_array = [[0.27, 0.24, 0.32, 0.28, 0.1, 0.2, 0.24, 0.23, 0.23, 0.21, 0.3, 0.21, 0.27, 0.26, 0.29, 0.22, 0.27, 0.28],
             [0.24, 0.17, 0.2, 0.22, 0.14, 0.27, 0.26, 0.24, 0.22, 0.21, 0.25, 0.23, 0.2, 0.21, 0.25, 0.25, 0.2, 0.24],
             [0.27, 0.19, 0.24, 0.26, 0.22, 0.27, 0.38, 0.35, 0.3, 0.28, 0.32, 0.33, 0.26, 0.29, 0.37, 0.36, 0.26, 0.31],
             [0.19, 0.19, 0.19, 0.17, 0.12, 0.19, 0.21, 0.13, 0.12, 0.16, 0.12, 0.19, 0.18, 0.16, 0.2, 0.21, 0.15, 0.18],
             [0.24, 0.17, 0.2, 0.22, 0.14, 0.27, 0.26, 0.24, 0.22, 0.21, 0.25, 0.23, 0.2, 0.21, 0.25, 0.25, 0.2, 0.24],
             [0.27, 0.19, 0.24, 0.26, 0.22, 0.27, 0.38, 0.35, 0.3, 0.28, 0.32, 0.33, 0.26, 0.29, 0.37, 0.36, 0.26, 0.31],
             [0.19, 0.19, 0.19, 0.17, 0.12, 0.19, 0.21, 0.13, 0.12, 0.16, 0.12, 0.19, 0.18, 0.16, 0.2, 0.21, 0.15, 0.18],
             [0.24, 0.17, 0.2, 0.22, 0.14, 0.27, 0.26, 0.24, 0.22, 0.21, 0.25, 0.23, 0.2, 0.21, 0.25, 0.25, 0.2, 0.24],
             [0.27, 0.19, 0.24, 0.26, 0.22, 0.27, 0.38, 0.35, 0.3, 0.28, 0.32, 0.33, 0.26, 0.29, 0.37, 0.36, 0.26, 0.31],
             [0.19, 0.19, 0.19, 0.17, 0.12, 0.19, 0.21, 0.13, 0.12, 0.16, 0.12, 0.19, 0.18, 0.16, 0.2, 0.21, 0.15, 0.18]]

def get_survey_keyword_importance(value_word_sim_array, weight):
    # 키워드 id와 중요도 값을 담을 딕셔너리. key가 키워드 id
    keyword_importance = {}
    # 키워드에 대해 하나씩 순회한다
    for word_idx in range(len(value_word_sim_array[0])):
        score = 0
        for weight_idx in range(10):
            # 가중치 값을 곱해준다
            score += weight[weight_idx] * value_word_sim_array[weight_idx][word_idx]
        # DB처럼 1부터 시작하도록 word_idx+1
        keyword_importance[word_idx + 1] = score
    # # 아이템 값 크기에 따라 소팅
    sorted_keyword_importance = dict(sorted(keyword_importance.items(), key=lambda item: item[1], reverse=True))

    return sorted_keyword_importance


print(get_survey_keyword_importance(value_word_sim_array, weight))