package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.output.*;

import java.util.List;

public interface ResultService {
    long createResult(Long userId);
    List<ReadResultOutDTO> readResultsByUserId(Long userId);
    List<ResultCompanyOutDTO> readResultsCompanies();

    List<ReadResultOutDTO> readSurveyResultsByUserId(Long userId);

    ResultOutputDTO insertResult(long userId);

    List<ReadResultSummaryOutDTO> readResultSummaryByUserId(long userId);
}