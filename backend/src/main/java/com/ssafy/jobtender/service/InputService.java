package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.input.CreateInputDTO;
import com.ssafy.jobtender.dto.output.CreateOutputDTO;
import com.ssafy.jobtender.dto.output.KeywordOutDTO;

import java.util.List;

public interface InputService {
    CreateOutputDTO createInputsKeyword(CreateInputDTO createInputDTO);
    List<KeywordOutDTO> keywordRankingByGender(String gender);
    List<KeywordOutDTO> keywordRankingByAge(int age);
    List<KeywordOutDTO> keywordRanking();
}