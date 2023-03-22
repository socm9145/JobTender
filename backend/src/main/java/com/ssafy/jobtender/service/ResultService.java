package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.dto.output.ResultCompanyOutDTO;

import java.util.List;

public interface ResultService {
    void createResult();
    List<ReadResultOutDTO> readResultsByUserId();
    List<ResultCompanyOutDTO> readResultsCompanies();
}