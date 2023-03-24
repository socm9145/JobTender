package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.output.KeywordOutDTO;
import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.dto.output.ResultCompanyOutDTO;

import java.util.List;

public interface ResultService {
    void createResult(Long userId);
    List<ReadResultOutDTO> readResultsByUserId(Long userId);
    List<ResultCompanyOutDTO> readResultsCompanies();
}