package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.InputDAO;
import com.ssafy.jobtender.service.InputService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

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
}