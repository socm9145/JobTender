package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.entity.CompanyMeasure;

import java.util.List;

public interface CompanyMeasureDAO {
    List<CompanyMeasure> readCompanyMeasuresByExtractedKeywordId(long extractKeywordId);
}
