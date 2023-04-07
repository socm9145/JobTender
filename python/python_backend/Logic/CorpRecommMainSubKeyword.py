# 가치관 키워드를 받는다. 자율성, 성장 등. 0번 부터 중요한 순서.
input_value_ids = [0, 1, 2]
# 가중치 값.
weight = [0.4, 0.3, 0.2]    # 바뀔 것임
# 가치관 id와 가중치를 페어링 한다.
input_weight_pair = {}
for i in range(len(weight)):
    input_weight_pair[input_value_ids[i]] = weight[i]

# 받은 가치관 키워드와 메인, 서브 키워드간의 연관도 매트릭스를 받는다. 2차원 배열로.
# 0: 사회공헌, 1: 자율성, 2: 성장, 3: 안정성
sub_sim_array = [[0.27, 0.24, 0.32, 0.28, 0.1, 0.2, 0.24, 0.23, 0.23, 0.21, 0.3, 0.21, 0.27, 0.26, 0.29, 0.22, 0.27, 0.28],
             [0.24, 0.17, 0.2, 0.22, 0.14, 0.27, 0.26, 0.24, 0.22, 0.21, 0.25, 0.23, 0.2, 0.21, 0.25, 0.25, 0.2, 0.24],
             [0.27, 0.19, 0.24, 0.26, 0.22, 0.27, 0.38, 0.35, 0.3, 0.28, 0.32, 0.33, 0.26, 0.29, 0.37, 0.36, 0.26, 0.31],
             [0.19, 0.19, 0.19, 0.17, 0.12, 0.19, 0.21, 0.13, 0.12, 0.16, 0.12, 0.19, 0.18, 0.16, 0.2, 0.21, 0.15, 0.18]
]
main_sim_array = [[0.42804604, 0, 0.5628291, 0, 0],
                  [0.30650422, 0.40301621, 0, 0.40301621, 0],
                  [0.31622777, 0, 0, 0, 0]
]

sub_vocab_set = {'경쟁력': 0, '글로벌': 1, '다양성': 2, '도전': 3, '두뇌활동': 4, '성장': 5, '역량': 6, '열정': 7, '의욕적': 8,
             '의지': 9, '자발적': 10, '전문성': 11, '정직': 12, '창의': 13, '최선': 14, '학습': 15, '혁신': 16, '협업': 17}

# DB에서 기업의 메인, 서브키워드 tf-idf를 받는다.
sub_tfidf_array = [[0.31622777, 0.31622777, 0.31622777, 0, 0, 0, 0, 0.31622777, 0, 0.31622777, 0, 0.31622777, 0.31622777, 0.31622777, 0.31622777, 0.31622777, 0, 0],
                   [0, 0, 0, 0.42804604, 0, 0.5628291, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.42804604, 0.5628291],
                   [0, 0, 0, 0.30650422, 0.40301621, 0, 0.40301621, 0, 0.40301621, 0, 0.40301621, 0, 0, 0, 0, 0, 0.30650422, 0]]
main_tfidf_array = [[0.42804604, 0, 0.5628291, 0, 0],
                    [0.30650422, 0.40301621, 0, 0.40301621, 0],
                    [0.31622777, 0, 0, 0, 0]
]


def value_company_sims(tfidf_array, sim_array):
    all_value_company_sim = {}
    # 기업을 순회하며 유사도를 계산한다
    for company_id in range(len(tfidf_array)):
        # 각 가치관에 대해 계산해준다.
        sim_score = 0
        for value_id in list(input_weight_pair.keys()):
            # 키워드들을 돌며 순회
            temp = 0
            # tf-idf 값과 가치관-서브/메인 키워드의 값을 곱해준다.
            for i in range(len(tfidf_array[0])):
                temp += tfidf_array[company_id][i] * sim_array[value_id][i]
            # 곱한 값을 전부 더한다. 곱 해주는 값은 weight
            sim_score += temp * input_weight_pair[value_id]
        # 적합도 총점을 딕셔너리에 기업 id와 함께 저장한다.
        all_value_company_sim[company_id] = sim_score
    return all_value_company_sim


main_key_sim = value_company_sims(main_tfidf_array, main_sim_array)
sub_key_sim = value_company_sims(sub_tfidf_array, sub_sim_array)
# 가중치 설정
main_weight = 0.7   # 바꿈
sub_weight = 0.3    # 바꿈
# 기업의 개수만큼 반복. 기업 id가 딕셔너리의 키로 사용
final_score = {}
for key in range(len(sub_key_sim)):
    score = main_weight * main_key_sim[key] + sub_weight * sub_key_sim[key]
    final_score[key] = score
# 내림차순 정렬
sorted_final_score = dict(sorted(final_score.items(), key=lambda item: item[1], reverse=True))

# 최상위 nth 기업 id와 함께 출력.
def top_nth(final_score, top_nth):
    top_nth_keys = list(final_score.keys())[:top_nth]
    top_nth_dict = {}
    for key in top_nth_keys:
        top_nth_dict[key] = final_score[key]
    return top_nth_dict

# 기업과 나에 대한 상위
print(top_nth(sorted_final_score, 3))   # 슷자 바뀔 수 있음. 5개 보고 싶으면 5, 3개 보고 싶으면 3.

# 최하위 nth 기업 id와 함께 출력.
def bottom_nth(final_score, bottom_nth):
    bottom_nth_keys = list(final_score.keys())[-1: -bottom_nth-1: -1]
    bottom_nth_dict = {}
    for key in bottom_nth_keys:
        bottom_nth_dict[key] = final_score[key]
    return bottom_nth_dict

# 기업과 나에 대한 하위
print(bottom_nth(sorted_final_score, 3))    # 슷자 바뀔 수 있음. 5개 보고 싶으면 5, 3개 보고 싶으면 3.

