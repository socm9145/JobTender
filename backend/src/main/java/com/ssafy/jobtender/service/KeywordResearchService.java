package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.output.StaticOutDTO;

public interface KeywordResearchService {
    StaticOutDTO readSurveyByKeywordIdAndGender(long keywordId, String gender);

    StaticOutDTO readSurveyByKeywordId(long keywordId);
}
