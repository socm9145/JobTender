package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.output.KeywordOutDTO;
import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.dto.output.ResultCompanyOutDTO;

import java.util.List;

public interface ResultService {
    long createResult(Long userId);
    List<ReadResultOutDTO> readResultsByUserId(Long userId);
    List<ResultCompanyOutDTO> readResultsCompanies();

    List<ReadResultOutDTO> readSurveyResultsByUserId(Long userId);
}