import time
import traceback
import random
import pymysql
import dload
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


def set_time():
    return random.randint(40, 60)


def get_data(lines, options):
    for name in lines:
        name = name.replace("\n", "")
        driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)

        driver.get('https://www.teamblind.com/kr/company/' + name)

        img_data = driver.find_element(By.XPATH, '/html/body/div/div/div/main/section/div/div/div[1]/header/div[2]/'
                                                 'div[1]/div[1]/img').get_attribute('src')

        img_name = name + '.png'
        dload.save(img_data, f'./companyLogo/{img_name}')

        time.sleep(set_time())


if __name__ == '__main__':
    user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36' \
                 ' (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36'
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('user-agent={0}'.format(user_agent))

    f = open('blindCompanyName.txt', 'r', encoding='utf-8')
    lines = f.readlines()
    get_data(lines, options)