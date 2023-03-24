package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.output.KeywordOutDTO;

import java.util.List;

public interface InputService {
    void createInputsKeyword(Long userId, List<Long> userKeyWord);
    List<KeywordOutDTO> keywordRankingByGender(String gender);
    List<KeywordOutDTO> keywordRankingByAge(int age);
    List<KeywordOutDTO> keywordRanking();
}