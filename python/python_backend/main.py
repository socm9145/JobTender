from flask import Flask, jsonify
from flask_cors import CORS
from Logic import KeywordLogic as kLogic, SurveyLogic as sLogic

app = Flask(__name__)
CORS(app)


@app.route('/result/keyword/<result_id>', methods=['GET'])
def keyword(result_id):
    data = kLogic.KeywordLogic(result_id)
    return jsonify(data.value_company_sims()), 200


@app.route('/result/survey/<result_id>', methods=['GET'])
def survey(result_id):
    data = sLogic.SurveyLogic(result_id)
    return jsonify(data.value_company_sims()), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)
