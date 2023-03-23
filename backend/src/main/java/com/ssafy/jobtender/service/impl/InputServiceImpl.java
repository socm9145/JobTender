package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.InputDAO;
import com.ssafy.jobtender.dto.output.KeywordOutDTO;
import com.ssafy.jobtender.entity.Input;
import com.ssafy.jobtender.service.InputService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class InputServiceImpl implements InputService{
    private final InputDAO inputDAO;
    @Autowired
    public InputServiceImpl(InputDAO inputDAO) {
        this.inputDAO = inputDAO;
    }
    @Override
    public void createInputsKeyword(Long userId, List<Long> userKeyWord) {
//        StringBuilder keyWord = new StringBuilder();
        for(long keyWord : userKeyWord){
//            keyWord.append(s).append(",");
            inputDAO.createInputsKeyword(userId, keyWord);
        }
//        keyWord.delete(keyWord.length()-1, keyWord.length());
    }

    @Override
    public List<KeywordOutDTO> keywordRanking() {
        List<Input> inputs = this.inputDAO.readKeywordAll();
        List<KeywordOutDTO> keywordOutDTOs = new ArrayList<>();
        Map<Long, Integer> map = new HashMap<>();
        PriorityQueue<KeywordOutDTO> pq = new PriorityQueue<>((x, y)-> Math.toIntExact((x.getCount() - y.getCount())));

        for (Input input : inputs){
            long keywordId = input.getKeyword().getKeywordId();

            if (map.containsKey(keywordId))
                map.put(keywordId, map.get(keywordId) + 1);

            else
                map.put(keywordId, 1);
        }

        for(Long key : map.keySet())
            pq.offer(new KeywordOutDTO(key, map.get(key)));

        while(!pq.isEmpty()) {
            KeywordOutDTO keywordOutDTO = pq.poll();
            keywordOutDTOs.add(new KeywordOutDTO(keywordOutDTO.getKeywordId(), keywordOutDTO.getCount()));
        }

        return keywordOutDTOs;
    }
}