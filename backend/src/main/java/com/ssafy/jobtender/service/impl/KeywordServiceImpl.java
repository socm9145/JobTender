package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.KeywordDAO;
import com.ssafy.jobtender.entity.Keyword;
import com.ssafy.jobtender.service.KeywordService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KeywordServiceImpl implements KeywordService {
    private final KeywordDAO keywordDAO;
    public KeywordServiceImpl (KeywordDAO keywordDAO){
        this.keywordDAO = keywordDAO;
    }
    @Override
    public List<Keyword> readAllKeywords() {
        List<Keyword> keywords = keywordDAO.readAllKeywords();
        return keywords;
    }
}