# 가치관 키워드를 받는다. 자율성, 성장 등. 1번 부터 중요한 순서.
DB_input_value_ids = [1, 2, 3]
input_value_ids = []
for id in DB_input_value_ids:
    input_value_ids.append(id - 1)
# 가중치 값.
weight = [0.4, 0.3, 0.2]
# 가치관 id와 가중치를 페어링 한다.
input_weight_pair = {}
for i in range(len(weight)):
    input_weight_pair[input_value_ids[i]] = weight[i]

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


# db에 넣어야함
def get_keyword_importance(value_word_sim_array, input_weight_pair):
    # 키워드 id와 중요도 값을 담을 딕셔너리. key가 키워드 id
    keyword_importance = {}
    # 키워드에 대해 하나씩 순회한다
    for word_idx in range(len(value_word_sim_array[0])):
        score = 0
        for key in input_weight_pair.keys():
            # 가중치 값을 곱해준다
            score += input_weight_pair[key] * value_word_sim_array[key][word_idx]
        keyword_importance[word_idx] = score

    # # 아이템 값 크기에 따라 소팅
    sorted_keyword_importance = dict(sorted(keyword_importance.items(), key=lambda item: item[1], reverse=True))

    return sorted_keyword_importance

print(get_keyword_importance(value_word_sim_array, input_weight_pair))
