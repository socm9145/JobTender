package com.ssafy.jobtender.dao;
import com.ssafy.jobtender.dto.input.CreateInputDTO;
import com.ssafy.jobtender.dto.input.KeywordInputDTO;
import com.ssafy.jobtender.dto.output.CreateOutputDTO;
import com.ssafy.jobtender.dto.output.KeywordOutDTO;
import com.ssafy.jobtender.entity.Input;

import java.util.List;

public interface InputDAO {
    CreateOutputDTO createInputsKeyword(CreateInputDTO createInputDTO);
    List<Input> readInputsByResultId(long resultId);
    List<Input> readKeywordAll();
    List<KeywordOutDTO> keywordRankingByGender(String gender);

    List<KeywordOutDTO> keywordRankingByAge(int age);
}