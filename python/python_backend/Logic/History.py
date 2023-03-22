class History:
    def __init__(self, user_id):
        self.user_id = user_id
        self.user_keyword = ""
        self.result_created_date = ""
        self.result_update_date = ""
        self.scores = ""
        self.company = dict()
        self.company_ratings = dict()

    def get_data(self):
        pass

    def return_data(self):
        return {
            "userId": self.user_id,
            "userKeyword": self.user_keyword,
            "result_created_date": self.result_created_date,
            "result_update_date": self.result_update_date,
            "scores": self.scores,
            "company": self.company,
            "company_ratings": self.company_ratings
        }
