package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.CompanyScoreDAO;
import com.ssafy.jobtender.dto.output.TfIdfOutDTO;
import com.ssafy.jobtender.service.CompanyScoreService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyScoreServiceImpl implements CompanyScoreService {
    private final CompanyScoreDAO companyScoreDAO;

    CompanyScoreServiceImpl(CompanyScoreDAO companyScoreDAO){
        this.companyScoreDAO = companyScoreDAO;
    }
    @Override
    public List<TfIdfOutDTO> readTfIdfValueByResultId(long resultId) {
        return this.companyScoreDAO.readTfIdfValueByResultId(resultId);
    }
}