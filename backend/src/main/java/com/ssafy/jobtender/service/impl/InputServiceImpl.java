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
    public void createInputsKeyword(Long userId, List<String> userKeyWord) {
        StringBuilder keyWord = new StringBuilder();
        for(String s : userKeyWord){
            keyWord.append(s).append(",");
        }
        keyWord.delete(keyWord.length()-1, keyWord.length());
        inputDAO.createInputsKeyword(userId, keyWord.toString());
    }
}