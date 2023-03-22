from flask import Flask, jsonify
from flask_cors import CORS
from Logic import History, Rank, Age, Gender, Random, Top
from Dao import Rank as rDao

app = Flask(__name__)
CORS(app)


@app.route('/result/company/rank', methods=['GET'])
def get_user_history():
    cur = rDao.RankDao()
    user_keyword_str = cur.find_user_keyword(14)[0]
    # print(type(user_keyword_str))
    user_keyword_list = user_keyword_str.split(',')
    # print(user_keyword_list)
    user_keyword_idx = cur.find_keyword_idx(user_keyword_list)
    cur.end()
    # return jsonify(user_keyword_idx)
    return 0

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)
