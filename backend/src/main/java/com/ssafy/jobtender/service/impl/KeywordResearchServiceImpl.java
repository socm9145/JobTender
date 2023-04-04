package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.KeywordResearchDAO;
import com.ssafy.jobtender.dto.output.StaticOutDTO;
import com.ssafy.jobtender.service.KeywordResearchService;
import org.springframework.stereotype.Service;

@Service
public class KeywordResearchServiceImpl implements KeywordResearchService {
    private final KeywordResearchDAO keywordResearchDAO;

    KeywordResearchServiceImpl(KeywordResearchDAO keywordResearchDAO){
        this.keywordResearchDAO = keywordResearchDAO;
    }
    @Override
    public StaticOutDTO readSurveyByKeywordIdAndGender(long keywordId, String gender) {
        return this.keywordResearchDAO.readSurveyByKeywordIdAndGender(keywordId, gender);
    }

    @Override
    public StaticOutDTO readSurveyByKeywordId(long keywordId) {
        return this.keywordResearchDAO.readSurveyByKeywordId(keywordId);
    }
}
