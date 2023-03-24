from flask import Flask, jsonify
from flask_cors import CORS
from requests import request
from Logic import History, Rank, Age, Gender, Random, Top
from Dao import Rank as rDao
from Logic import Rank as rLogic

app = Flask(__name__)
CORS(app)


@app.route('/result/company/rank/<result_id>/<keyword1>/<keyword2>/<keyword3>', methods=['GET'])
def get_user_history(result_id, keyword1, keyword2, keyword3):
    keyword = [int(keyword1), int(keyword2), int(keyword3)]
    data = rLogic.Rank(result_id, keyword)
    return jsonify(data.set_data()), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)
