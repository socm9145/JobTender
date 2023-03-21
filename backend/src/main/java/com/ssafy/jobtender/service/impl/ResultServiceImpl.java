package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.service.ResultService;
import com.ssafy.jobtender.dao.ResultDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ResultServiceImpl implements ResultService {
    private final ResultDAO resultDAO;

    @Autowired
    public ResultServiceImpl(ResultDAO resultDAO){
        this.resultDAO = resultDAO;
    }
    @Override
    public void createResult() {

    }

    @Override
    public List<ReadResultOutDTO> readResultsByUserId() {
        return this.resultDAO.readResultsByUserId();
    }
}