package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.output.TfIdfOutDTO;

import java.util.List;

public interface CompanyScoreService {
    List<TfIdfOutDTO> readTfIdfValueByResultId(long resultId);
}