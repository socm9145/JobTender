package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.dto.output.StaticOutDTO;

public interface KeywordResearchDAO {
    StaticOutDTO readSurveyByKeywordIdAndGender(long keywordId, String gender);
}
