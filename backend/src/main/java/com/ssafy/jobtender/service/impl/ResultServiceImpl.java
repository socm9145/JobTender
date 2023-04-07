package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.SurveyDAO;
import com.ssafy.jobtender.dto.input.KeywordRankInputDTO;
import com.ssafy.jobtender.dto.input.SurveyRankInputDTO;
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
    private final SurveyDAO surveyDAO;
    private final double[] weight = {0.4, 0.3, 0.2};
    private final int MAX_INDEX_FOR_KEYWORD_RANK = 5;

    @Autowired
    public ResultServiceImpl(ResultDAO resultDAO, SurveyDAO surveyDAO) {
        this.resultDAO = resultDAO;
        this.surveyDAO = surveyDAO;
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
    public List<Chart4OutDTO> readC4ByResultId(long resultId) {
        return this.resultDAO.readC4ByResultId(resultId);
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
            keywordRankDoubleOutDTOList.add(new KeywordRankDoubleOutDTO(keywordRankOutDTOLists[0].get(i).getLetter(), frequencies[i]));
        }
        keywordRankDoubleOutDTOList.sort((keywordRankDoubleOutDTO1,keywordRankDoubleOutDTO2)->{
            return Double.compare(keywordRankDoubleOutDTO2.getFrequency(), keywordRankDoubleOutDTO1.getFrequency());
        });

        List<KeywordRankDoubleOutDTO> keywordRankDoubleOutDTOTopBottomList = new LinkedList<>();
        keywordRankDoubleOutDTOTopBottomList.addAll(keywordRankDoubleOutDTOList.subList(0, MAX_INDEX_FOR_KEYWORD_RANK));
        int listSize = keywordRankDoubleOutDTOList.size();
        keywordRankDoubleOutDTOTopBottomList.addAll(keywordRankDoubleOutDTOList.subList(listSize-MAX_INDEX_FOR_KEYWORD_RANK, listSize));

        listSize = keywordRankDoubleOutDTOTopBottomList.size();
        double minFrequency = keywordRankDoubleOutDTOTopBottomList.get(listSize-1).getFrequency();
        if(minFrequency < 0){
            for(int i=0;i<listSize;i++){
                double frequency = keywordRankDoubleOutDTOTopBottomList.get(i).getFrequency();
                keywordRankDoubleOutDTOTopBottomList.get(i).setFrequency(Math.round((frequency - minFrequency + 1) * 100)/100.0);
            }
        }

        return keywordRankDoubleOutDTOTopBottomList;
    }

    @Override
    public List<KeywordRankDoubleOutDTO> readSurveyRank(List<SurveyRankInputDTO> surveyRankInputDTOList) {
        if(surveyRankInputDTOList.size() == 0){
            return null;
        }
        for(SurveyRankInputDTO surveyRankInputDTO : surveyRankInputDTOList){
            System.out.println(surveyRankInputDTO.getSurveyId() + " " + surveyRankInputDTO.getScore());
        }

        List<SurveyOutDTO> surveyOutDTOList = surveyDAO.readSurveys();
        Map<Long, Double> keywordMap = new HashMap<>();
        Map<Long, Integer> keywordCountMap  = new HashMap<>();
        //설문 조사 결과 점수를 키워드 값으로 매핑
        for(int i=0;i<surveyRankInputDTOList.size();i++){
            long keywordId = surveyOutDTOList.get(i).getKeywordId();
            if(!keywordMap.containsKey(keywordId)){
                keywordMap.put(keywordId, Double.parseDouble(surveyRankInputDTOList.get(i).getScore()));
                keywordCountMap.put(keywordId, 1);
            }else{
                keywordMap.replace(keywordId, keywordMap.get(keywordId) + Double.parseDouble(surveyRankInputDTOList.get(i).getScore()));
                keywordCountMap.replace(keywordId, keywordCountMap.get(keywordId) + 1);
            }
        }

        //점수를 키워드 별로 평균 내기
        keywordMap.forEach((keywordId, score) -> {
            keywordMap.replace(keywordId, keywordMap.get(keywordId) / keywordCountMap.get(keywordId) * 1.0);
        });

        //키워드를 배열에 삽입
        long[] keywords = new long[keywordMap.size()];
        int keywordLength = keywords.length;
        int keywordIndex = 0;
        for(long keywordId : keywordMap.keySet()){
            keywords[keywordIndex++] = keywordId;
        }

        //키워드 별 추출 키워드 받고 점수 저장
        List<KeywordRankOutDTO>[] keywordRankOutDTOLists = new List[keywordLength];
        double[] frequencies = null;
        for(int i=0;i<keywordLength;i++){
            keywordRankOutDTOLists[i] = resultDAO.readKeywordRank(keywords[i]);
            System.out.println(keywords[i]);
            if(i==0){
                frequencies = new double[keywordRankOutDTOLists[i].size()];
            }
            for(int j=0;j<keywordRankOutDTOLists[i].size();j++){
                frequencies[j] += Integer.parseInt(keywordRankOutDTOLists[i].get(j).getFrequency()) * keywordMap.get(keywords[i]);
            }
        }
        //합산된 점수로 OutDTO List 만들기
        List<KeywordRankDoubleOutDTO> keywordRankDoubleOutDTOList = new LinkedList<>();
        for(int i=0;i<keywordRankOutDTOLists[0].size();i++){
            keywordRankDoubleOutDTOList.add(new KeywordRankDoubleOutDTO(keywordRankOutDTOLists[0].get(i).getLetter(), frequencies[i]));
        }

        //점수 별 내림차순 정렬
        keywordRankDoubleOutDTOList.sort((keywordRankDoubleOutDTO1,keywordRankDoubleOutDTO2)->{
            return Double.compare(keywordRankDoubleOutDTO2.getFrequency(), keywordRankDoubleOutDTO1.getFrequency());
        });

        //상위 n개, 하위 n개 리스트로 변형
        List<KeywordRankDoubleOutDTO> keywordRankDoubleOutDTOTopBottomList = new LinkedList<>();
        keywordRankDoubleOutDTOTopBottomList.addAll(keywordRankDoubleOutDTOList.subList(0, MAX_INDEX_FOR_KEYWORD_RANK));
        int listSize = keywordRankDoubleOutDTOList.size();
        keywordRankDoubleOutDTOTopBottomList.addAll(keywordRankDoubleOutDTOList.subList(listSize-MAX_INDEX_FOR_KEYWORD_RANK, listSize));

        //소수 셋째자리에서 반올림
        listSize = keywordRankDoubleOutDTOTopBottomList.size();
        double minFrequency = keywordRankDoubleOutDTOTopBottomList.get(listSize-1).getFrequency();
        if(minFrequency < 0){
            for(int i=0;i<listSize;i++){
                double frequency = keywordRankDoubleOutDTOTopBottomList.get(i).getFrequency();
                keywordRankDoubleOutDTOTopBottomList.get(i).setFrequency(Math.round((frequency - minFrequency + 1) * 100)/100.0);
            }
        }

        return keywordRankDoubleOutDTOTopBottomList;
    }
}