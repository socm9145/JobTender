package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.dto.output.KeywordOutDTO;
import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.dto.output.ResultCompanyOutDTO;
import com.ssafy.jobtender.dto.output.ResultOutputDTO;
import com.ssafy.jobtender.entity.Result;

import java.util.List;
import java.util.Optional;

public interface ResultDAO {
    long createResult(Long userId);
    List<ReadResultOutDTO> readResultsByUserId(Long userId);
    List<ReadResultOutDTO> readSurveyResultsByUserId(Long userId);
    List<ResultCompanyOutDTO> readResultsCompanies();
    List<Result> keywordRanking();
    ResultOutputDTO insertResult(long userId);
}