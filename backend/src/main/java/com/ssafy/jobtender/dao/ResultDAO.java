package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.dto.input.KeywordRankInputDTO;
import com.ssafy.jobtender.dto.output.*;
import com.ssafy.jobtender.dto.output.*;
import com.ssafy.jobtender.entity.Result;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ResultDAO {
    long createResult(Long userId);
    List<ReadResultOutDTO> readResultsByUserId(Long userId);
    List<ReadResultOutDTO> readSurveyResultsByUserId(Long userId);
    List<ResultCompanyOutDTO> readResultsCompanies();
    List<Result> keywordRanking();
    ResultOutputDTO insertResult(long userId);

    Map<Long, HistoryOutDTO> readHistoriesByUserId(Long userId);

    List<KeywordRankOutDTO> readKeywordRank(long keywordId);
}