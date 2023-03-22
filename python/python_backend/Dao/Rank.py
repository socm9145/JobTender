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

    def find_user_keyword(self, result_id):
        sql = '''
        select keyword from inputs where result_id = %s
        '''
        cur = self.conn.cursor()
        result = ""
        try:
            if cur.execute(sql, result_id) == 1:
                result = list(cur.fetchone())
            else:
                result = 'error'
        except Exception:
            print(traceback.format_exc())
        return result

    def find_keyword_idx(self, user_keyword):
        sql = '''
        select keyword_id from keywords where keyword = %s
        '''
        cur = self.conn.cursor()
        result = list()
        # 이부분 수정
        for key in user_keyword:
            if cur.execute(sql, key) == 1:
                print(key)
                print(list(cur.fetchone()))
                result.append(list(cur.fetchone())[0])
        print("b -> " + str(result))
        return result

    def end(self):
        self.conn.close()