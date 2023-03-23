package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.dto.output.KeywordOutDTO;
import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.dto.output.ResultCompanyOutDTO;
import com.ssafy.jobtender.entity.Result;

import java.util.List;
import java.util.Optional;

public interface ResultDAO {
    void createResult(Long userId);
    List<ReadResultOutDTO> readResultsByUserId(Long userId);
    List<ResultCompanyOutDTO> readResultsCompanies();
    List<Result> keywordRanking();
}