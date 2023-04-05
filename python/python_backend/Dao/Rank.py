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

    def get_sub_main_sim_score(self, keyword_id, extracted_keyword_id):
        sql = '''
        select score from keyword_measures where keyword_id=%s and extracted_keyword_id=%s
        '''
        cur = self.conn.cursor()
        result = list()
        # print(extracted_keyword_id)
        for idx in extracted_keyword_id:
            temp = [keyword_id, idx]
            cur.execute(sql, temp)
            # print(cur.fetchone()[0])
            result.append(float(cur.fetchone()[0]))
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
                result.append(float(data[0]))
        return result

    def insert_score(self, data):
        sql = '''
        INSERT INTO `company_scores` (result_id, company_id, score, company_score_rank) VALUES (%s, %s, %s, %s);
        '''
        cur = self.conn.cursor()
        cur.execute(sql, data)
        self.conn.commit()

    def end(self):
        self.conn.close()