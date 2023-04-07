import traceback
import random
import pymysql


class RankDao:
    def __init__(self):
        host = '3.38.211.113'
        user = 'jobtender'
        pwd = 'jobtender'
        db = 'jobtender'
        self.conn = pymysql.connect(host=host, user=user, password=pwd, db=db, charset='utf8')

    # def find_user_keyword(self, result_id):
    #     sql = '''
    #     select keyword from inputs where result_id = %s
    #     '''
    #     cur = self.conn.cursor()
    #     result = ""
    #     try:
    #         if cur.execute(sql, result_id) == 1:
    #             result = list(cur.fetchone())
    #         else:
    #             result = 'error'
    #     except Exception:
    #         print(traceback.format_exc())
    #     return result
    #
    # def find_keyword_idx(self, user_keyword):
    #     sql = '''
    #     select keyword_id from keywords where keyword = %s
    #     '''
    #     cur = self.conn.cursor()
    #     result = list()
    #
    #     for key in user_keyword:
    #         if cur.execute(sql, key) == 1:
    #             temp = list(cur.fetchone())[0]-1
    #             result.append(temp)
    #     return result

    def get_extracted_keyword_id(self, type):
        sql = '''
        select extract_keyword_id from extracted_keywords where type=%s
        '''
        cur = self.conn.cursor()
        result = list()
        cur.execute(sql, type)
        for data in cur.fetchall():
            result.append(data[0])
        return result

    # 이부분 최적화 하면 좋겠는데..
    def get_sub_main_sim_score(self, keyword_id, extracted_keyword_id):
        sql = '''
        select score from keyword_measures where keyword_id=%s and extracted_keyword_id=%s
        '''
        cur = self.conn.cursor()
        result = list()
        for idx in extracted_keyword_id:
            temp = [keyword_id, idx]
            cur.execute(sql, temp)
            # print(cur.execute(sql))
            # print(cur.fetchone()[0])
            result.append(cur.fetchone()[0])
        return result

    def get_companies_id(self):
        sql = '''
        select company_id, name from companies
        '''
        cur = self.conn.cursor()
        result = dict()
        cur.execute(sql)
        for data in cur.fetchall():
            result[data[0]] = data[1]
        return result

    def get_tfidf_sim_data(self, company_id):
        sql = '''
        SELECT
            cm.company_id, cm.score as tf_idf_score, km.score as similarity_score
        FROM
          company_measures cm
          JOIN keyword_measures km ON cm.extracted_keyword_id = km.extracted_keyword_id
        WHERE
            cm.score != 0.0 AND keyword_id = %s
        ORDER BY cm.company_id
        '''
        cur = self.conn.cursor()
        result = dict()
        cur.execute(sql, company_id)
        for data in cur.fetchall():
            if data[0] in result.keys():
                result[data[0]].append(float(data[1]) * float(data[2]))
            else:
                result[data[0]] = [float(data[1]) * float(data[2])]
        return result

    def get_companies_tfidf_sub_main(self, company_id, extracted_keyword_id):
        sql = '''
        select score from company_measures where company_id=%s and extracted_keyword_id=%s
        '''
        cur = self.conn.cursor()
        result = list()
        for idx in extracted_keyword_id:
            temp = [company_id, idx]
            cur.execute(sql, temp)
            for data in cur.fetchall():
                # print(data)
                result.append(float(data[0]))
        return result

    def get_keyword_data(self, result_id):
        sql = '''
        select keyword_id from inputs where result_id = %s order by keyword_rank
        '''
        cur = self.conn.cursor()
        result = list()
        cur.execute(sql, result_id)
        for data in cur.fetchall():
            result.append(data[0])
        return result

    def get_survey_data(self, result_id):
        sql = '''
        select survey_id, score from survey_results where result_id=%s order by survey_id
        '''
        cur = self.conn.cursor()
        result = dict()
        cur.execute(sql, result_id)
        for data in cur.fetchall():
            result[data[0]] = int(data[1])
        return result

    def insert_score(self, data):
        sql = '''
        INSERT INTO `company_scores` (result_id, company_id, score, company_score_rank) VALUES (%s, %s, %s, %s);
        '''
        cur = self.conn.cursor()
        cur.execute(sql, data)
        self.conn.commit()

    def insert_survey_score(self, data):
        sql = '''
        INSERT INTO `survey_scores` (survey_score_rank, score, company_id, result_id) VALUES (%s, %s, %s, %s)
        '''
        cur = self.conn.cursor()
        cur.execute(sql, data)
        self.conn.commit()

    def end(self):
        self.conn.close()