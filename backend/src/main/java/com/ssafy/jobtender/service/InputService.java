package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.output.KeywordOutDTO;

import java.util.List;

public interface InputService {
    void createInputsKeyword(Long userId, List<Long> userKeyWord);
    List<KeywordOutDTO> keywordRanking();
}