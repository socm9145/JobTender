package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.dao.KeywordDAO;
import com.ssafy.jobtender.entity.Keyword;
import com.ssafy.jobtender.entity.User;
import com.ssafy.jobtender.repo.KeywordRepo;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class KeywordDAOImpl implements KeywordDAO {
    private final KeywordRepo keywordRepo;

    public KeywordDAOImpl(KeywordRepo keywordRepo){
        this.keywordRepo = keywordRepo;
    }

    @Override
    public List<Keyword> readAllKeywords() {
        List<Keyword> keywords = keywordRepo.findAll();
        return keywords;
    }
}