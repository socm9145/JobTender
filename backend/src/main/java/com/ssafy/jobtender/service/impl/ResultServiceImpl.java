package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dto.output.*;
import com.ssafy.jobtender.entity.Input;
import com.ssafy.jobtender.entity.Result;
import com.ssafy.jobtender.service.ResultService;
import com.ssafy.jobtender.dao.ResultDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ResultServiceImpl implements ResultService {
    private final ResultDAO resultDAO;

    @Autowired
    public ResultServiceImpl(ResultDAO resultDAO){
        this.resultDAO = resultDAO;
    }
    @Override
    public long createResult(Long userId) {
        return resultDAO.createResult(userId);
    }

    @Override
    public List<ReadResultOutDTO> readResultsByUserId(Long userId) {
        return this.resultDAO.readResultsByUserId(userId);
    }

    @Override
    public List<ResultCompanyOutDTO> readResultsCompanies() {
        return this.resultDAO.readResultsCompanies();
    }

    @Override
    public List<ReadResultOutDTO> readSurveyResultsByUserId(Long userId) {
        return this.resultDAO.readSurveyResultsByUserId(userId);
    }

    @Override
    public ResultOutputDTO insertResult(long userId) {
        return this.resultDAO.insertResult(userId);
    }

    @Override
    public List<ReadResultSummaryOutDTO> readResultSummaryByUserId(long userId) {
        return this.resultDAO.readResultSummaryByUserId(userId);
    }
}