package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.dto.output.TfIdfOutDTO;

import java.util.List;

public interface CompanyScoreDAO {
    List<TfIdfOutDTO> readTfIdfValueByResultId(long resultId);
}