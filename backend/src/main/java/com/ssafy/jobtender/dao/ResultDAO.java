package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.dto.output.ResultCompanyOutDTO;

import java.util.List;
import java.util.Optional;

public interface ResultDAO {
    void createResult(Long userId);
    List<ReadResultOutDTO> readResultsByUserId();
    List<ResultCompanyOutDTO> readResultsCompanies();
}