import time
import traceback
import random
import pymysql
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


def set_time():
    return random.randint(40, 60)


class BlindData:
    def __init__(self):
        self.host = '3.38.211.113'
        self.user = 'jobtender'
        self.pwd = 'jobtender'
        self.db = 'jobtender'
        self.conn = pymysql.connect(host=self.host, user=self.user, password=self.pwd, db=self.db, charset='utf8')
        self.cur = self.conn.cursor()
        self.driver = self.webdriver_init()

    # selenium setting
    def webdriver_init(self):
        user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36' \
                     ' (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36'
        options = Options()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('user-agent={0}'.format(user_agent))
        return webdriver.Chrome(ChromeDriverManager().install(), options=options)

    def get_company_info(self, companyName):
        self.driver.get('https://www.teamblind.com/kr/company/' + companyName)

        intro = list()
        stars = list()

        total_rate = self.driver.find_element(By.CLASS_NAME, 'rate').text
        total_rate = total_rate.split('\n')[1]
        stars.append(total_rate)

        # 기업 정보
        for i in range(2, 7):
            data = self.driver.find_element(By.XPATH,
                                            '/html/body/div/div/div/main/section/div/div/div[2]/div/div/div/'
                                            'section[1]/ul/li[' + str(i) + ']').text
            intro.append(data.split('\n')[1])

        # 기업 평점 정보
        for i in range(1, 6):
            star = self.driver.find_element(By.XPATH,
                                            '/html/body/div/div/div/main/section/div/div/div[2]/div/div/div/'
                                            'div[1]/section/div[1]/div[2]/ul/li[' + str(i) + ']/strong').text

            stars.append(star)

        return {'name': companyName,
                'basic': {'total_rate': total_rate, 'type': intro[0], 'addr': intro[1], 'year': intro[2],
                          'employees': intro[3], 'salary': intro[4]},
                'star': {'growth': stars[0], 'balance': stars[1], 'salary_welfare': stars[2],
                         'culture': stars[3], 'management': stars[4]}}

    def find_company(self, companyName):
        sql_find_company = '''
            SELECT company_id FROM companies WHERE name = %s
            '''
        result = -1
        try:
            self.cur.execute(sql_find_company, companyName)
            result = self.cur.fetchone()
            self.conn.commit()
        except Exception:
            print(traceback.format_exc())

        return result

    def insert_companies(self, data):
        sql = '''
              INSERT INTO `companies` (name, type, scale, employees_number, address, year_founded, salary)
              VALUES (%(name)s, %(type)s, %(scale)s, %(employees)s, %(addr)s, %(year)s, %(salary)s);
              '''
        print(data)
        try:
            pass
            self.cur.execute(sql, data)
            self.conn.commit()
        except Exception:
            print(traceback.format_exc())

    def insert_rank(self, data):
        sql = '''
              INSERT INTO `company_ratings` (company_id, average_rating, growth_rating, balance_rating, 
              salary_welfare_rating, culture_rating, management_rating)
              VALUES (%(company_id)s, %(total)s, %(growth)s, %(balance)s, %(salary_welfare)s, %(culture)s, %(management)s);
              '''
        print(data)
        try:
            pass
            self.cur.execute(sql, data)
            self.conn.commit()
        except Exception:
            print(traceback.format_exc())

    def update_companies(self, data):
        sql = '''
         UPDATE `companies` SET employees_number = %(employees)s, address = %(addr)s,
         salary = %(salary)s, type = %(type)s, scale = %(scale)s, year_founded = %(year)s  WHERE name = %(name)s;
        '''
        print(data)
        try:
            pass
            self.cur.execute(sql, data)
            self.conn.commit()
        except Exception:
            print(traceback.format_exc())

    def update_rank(self, data):
        sql = '''
        UPDATE `company_ratings` SET average_rating = %(total)s, growth_rating = %(growth)s, balance_rating = %(balance)s,
        salary_welfare_rating = %(salary_welfare)s, culture_rating = %(culture)s, management_rating = %(management)s
        WHERE company_id = %(company_id)s;
        '''
        print(data)
        try:
            pass
            self.cur.execute(sql, data)
            self.conn.commit()
        except Exception:
            print(traceback.format_exc())

    def end(self):
        self.conn.close()
        self.driver.quit()


if __name__ == "__main__":
    b = BlindData()

    # get company names
    f = open('blindCompanyName.txt', 'r', encoding='utf-8')
    lines = f.readlines()
    # lines = ['삼성전자']
    for name in lines:
        name = name.replace("\n", "")

        try:
            info = b.get_company_info(name)
        except Exception:
            continue

        basic = {'name': info['name'], 'type': info['basic']['type'], 'scale': '대기업',
                 'employees': info['basic']['employees'],
                 'addr': info['basic']['addr'], 'year': info['basic']['year'], 'salary': info['basic']['salary']}

        star = {'company_id': b.find_company(name), 'total': info['basic']['total_rate'],
                'growth': info['star']['growth'], 'balance': info['star']['balance'],
                'salary_welfare': info['star']['salary_welfare'], 'culture': info['star']['culture'],
                'management': info['star']['management']}

        if star['company_id'] is None:  # insert
            b.insert_companies(basic)
            star['company_id'] = b.find_company(name)
            b.insert_rank(star)
        else:  # update
            b.update_companies(basic)
            b.update_rank(star)
        time.sleep(set_time())
    b.end()
