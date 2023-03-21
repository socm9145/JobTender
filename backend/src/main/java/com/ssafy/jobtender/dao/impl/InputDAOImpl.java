package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.entity.Input;
import com.ssafy.jobtender.repo.InputRepo;
import com.ssafy.jobtender.dao.InputDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InputDAOImpl implements InputDAO{
    private final InputRepo inputRepo;
    @Autowired
    public InputDAOImpl(InputRepo inputRepo) {
        this.inputRepo = inputRepo;
    }

    @Override
    public List<String> createInputsKeyword(List<String> userKeyWord) {
        System.out.println("inputDao : " + userKeyWord.toString());
//        Input input = new Input();
//        this.inputRepo.save(input);
        return null;
    }
}