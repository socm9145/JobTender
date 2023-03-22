import time
import traceback
import random
import pymysql
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


def find_company(name):
    sql_find_company = '''
    SELECT COUNT(*) FROM Companies WHERE name = %s
    '''
    result = -1
    try:
        result = cur.execute(sql_find_company, name)
        conn.commit()
    except Exception as e1:
        print(traceback.format_exc())
    if result == 0:
        return True
    else:
        return False


def set_time():
    return random.randint(40, 60)


def get_company_info(companyName):
    driver.get('https://www.teamblind.com/kr/company/' + companyName)

    intro = list()
    stars = list()

    total_rate = driver.find_element(By.CLASS_NAME, 'rate').text
    total_rate = total_rate.split('\n')[1]
    stars.append(total_rate)

    # 기업 정보
    for i in range(2, 7):
        data = driver.find_element(By.XPATH,
                                   '/html/body/div/div/div/main/section/div/div/div[2]/div/div/div/section[1]/ul/li[' +
                                   str(i) + ']').text
        intro.append(data.split('\n')[1])

    # 기업 평점 정보
    for i in range(1, 6):
        star = driver.find_element(By.XPATH,
                                   '/html/body/div/div/div/main/section/div/div/div[2]/div/div/div/div[1]/section/'
                                   'div[1]/div[2]/ul/li[' + str(i) + ']/strong').text

        stars.append(star)

    return {'name': companyName,
            'basic': {'total_rate': total_rate, 'type': intro[0], 'addr': intro[1], 'year': intro[2],
                      'employees': intro[3], 'salary': intro[4]},
            'star': {'growth': stars[0], 'balance': stars[1], 'salary_welfare': stars[2],
                     'culture': stars[3], 'management': stars[4]}}


if __name__ == "__main__":
    user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36' \
                 ' (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36'

    # selenium setting
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('user-agent={0}'.format(user_agent))
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)

    # db setting
    host = '3.38.211.113'
    user = 'jobtender'
    pwd = 'jobtender'
    db = 'jobtender'

    # get company names
    # f = open('blindCompanyName.txt', 'r', encoding='utf-8')
    # lines = f.readlines()

    lines = ['삼성전자']
    conn = pymysql.connect(host=host, user=user, password=pwd, db=db, charset='utf8')
    a = 0
    for name in lines:
        if a == 6:
            break
        a += 1
        name = name.replace("\n", "")
        try:
            info = get_company_info(name)  # 기업 정보를 json 형태로 return

            if find_company(name):
            #     insert 실행
                pass
            else:
            #     update 실행
                pass

            cur = conn.cursor()
            basic = {'name': info['name'], 'type': info['basic']['type'], 'scale': '대기업',
                     'employees': info['basic']['employees'],
                     'addr': info['basic']['addr'], 'year': info['basic']['year'], 'salary': info['basic']['salary']}

            sql_companies = '''
                            INSERT INTO `Companies` (name, type, scale, employees_number, address, year_founded, salary)
                            VALUES (%(name)s, %(type)s, %(scale)s, %(employees)s, %(addr)s, %(year)s, %(salary)s);
                            '''
            try:
                cur.execute(sql_companies, basic)
                conn.commit()
            except Exception as e1:
                print(traceback.format_exc())
                break

            company_no = '''
                          SELECT company_id FROM Companies WHERE name = %s;
                         '''
            try:
                company_no = cur.execute(company_no, name)
                conn.commit()
            except Exception as e2:
                print(traceback.format_exc())
                break

            star = [company_no, info['basic']['total_rate'], info['star']['growth'], info['star']['balance'],
                    info['star']['salary_welfare'], info['star']['culture'], info['star']['management']]
            sql_ratings = '''
                          INSERT INTO `Company_Ratings` (company_id, average_rating, growth_rating, balance_rating, 
                          salary_welfare_rating, culture_rating, management_rating)
                          VALUES (%s, %s, %s, %s, %s, %s, %s);
                          '''
            try:
                cur.execute(sql_ratings, star)
                conn.commit()
            except Exception as e3:
                print(traceback.format_exc())
                break
        except Exception as e:
            print(e)
            continue
        time.sleep(set_time())

    conn.close()
    driver.quit()
