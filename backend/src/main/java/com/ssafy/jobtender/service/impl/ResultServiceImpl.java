package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dto.input.KeywordRankInputDTO;
import com.ssafy.jobtender.dto.output.*;
import com.ssafy.jobtender.dto.output.*;
import com.ssafy.jobtender.entity.Input;
import com.ssafy.jobtender.entity.Result;
import com.ssafy.jobtender.service.ResultService;
import com.ssafy.jobtender.dao.ResultDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class ResultServiceImpl implements ResultService {
    private final ResultDAO resultDAO;
    private final double[] weight = {0.4, 0.3, 0.2};
    private final int MAX_INDEX_FOR_KEYWORD_RANK = 10;

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
    public Map<Long, HistoryOutDTO> readHistoriesByUserId(Long userId) {
        return this.resultDAO.readHistoriesByUserId(userId);
    }

    @Override
    public List<KeywordRankDoubleOutDTO> readKeywordRank(KeywordRankInputDTO keywordRankInputDTO) {
        long[] keywords = keywordRankInputDTO.getKeywords();
        int keywordLength = keywords.length;
        List<KeywordRankOutDTO>[] keywordRankOutDTOLists = new List[keywordLength];
        double[] frequencies = null;
        for(int i=0;i<keywordLength;i++){
            keywordRankOutDTOLists[i] = resultDAO.readKeywordRank(keywords[i]);
            System.out.println(keywords[i]);
            if(i==0){
                frequencies = new double[keywordRankOutDTOLists[i].size()];
            }
            int finalI = i;
            for(int j=0;j<keywordRankOutDTOLists[i].size();j++){
                frequencies[j] += Integer.parseInt(keywordRankOutDTOLists[i].get(j).getFrequency()) * weight[finalI];
            }
        }
        List<KeywordRankDoubleOutDTO> keywordRankDoubleOutDTOList = new LinkedList<>();
        for(int i=0;i<keywordRankOutDTOLists[0].size();i++){
            keywordRankDoubleOutDTOList.add(new KeywordRankDoubleOutDTO(keywordRankOutDTOLists[0].get(i).getLetter(), Math.round(frequencies[i] * 100)/100.0));
        }
        keywordRankDoubleOutDTOList.sort((keywordRankDoubleOutDTO1,keywordRankDoubleOutDTO2)->{
            return Double.compare(keywordRankDoubleOutDTO2.getFrequency(), keywordRankDoubleOutDTO1.getFrequency());
        });

        return keywordRankDoubleOutDTOList.subList(0, MAX_INDEX_FOR_KEYWORD_RANK);
    }
}