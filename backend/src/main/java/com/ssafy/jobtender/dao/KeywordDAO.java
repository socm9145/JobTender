package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.entity.Keyword;

import java.util.List;

public interface KeywordDAO {
    List<Keyword> readAllKeywords();
}