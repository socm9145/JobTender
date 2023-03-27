package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.entity.KeywordMeasure;

import java.util.List;

public interface KeywordMeasureDAO {
    List<KeywordMeasure> readExtractedKeywordsByKeywordId(long keywordId);
}
