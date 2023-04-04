package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.output.*;
import com.ssafy.jobtender.dto.output.*;

import java.util.List;
import java.util.Map;

public interface ResultService {
    long createResult(Long userId);
    List<ReadResultOutDTO> readResultsByUserId(Long userId);
    List<ResultCompanyOutDTO> readResultsCompanies();

    List<ReadResultOutDTO> readSurveyResultsByUserId(Long userId);

    ResultOutputDTO insertResult(long userId);

    Map<Long, HistoryOutDTO> readHistoriesByUserId(Long userId);

    List<Chart4OutDTO> readC4ByResultId(long resultId);
}