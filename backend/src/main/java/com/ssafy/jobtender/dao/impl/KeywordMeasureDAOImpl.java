package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.dao.KeywordMeasureDAO;
import com.ssafy.jobtender.entity.KeywordMeasure;
import com.ssafy.jobtender.repo.KeywordMeasureRepo;

import java.util.List;
import java.util.Optional;

public class KeywordMeasureDAOImpl implements KeywordMeasureDAO {
    private final KeywordMeasureRepo keywordMeasureRepo;
    public KeywordMeasureDAOImpl (KeywordMeasureRepo keywordMeasureRepo){
        this.keywordMeasureRepo = keywordMeasureRepo;
    }

    @Override
    public List<KeywordMeasure> readExtractedKeywordsByKeywordId(long keywordId) {
        Optional<List<KeywordMeasure>> isKeywordMeasure = keywordMeasureRepo.findAllByKeywordId(keywordId);
        if(isKeywordMeasure.isEmpty()) {
            return null;
        }else {
            List<KeywordMeasure> keywordMeasures = isKeywordMeasure.get();
            return keywordMeasures;
        }
    }
}
