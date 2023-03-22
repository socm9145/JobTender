package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.entity.Input;
import com.ssafy.jobtender.entity.Result;
import com.ssafy.jobtender.repo.InputRepo;
import com.ssafy.jobtender.dao.InputDAO;
import com.ssafy.jobtender.repo.ResultRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Component
public class InputDAOImpl implements InputDAO{
    @PersistenceContext
    private EntityManager em;
    private final InputRepo inputRepo;
    private final ResultRepo resultRepo;
    @Autowired
    public InputDAOImpl(InputRepo inputRepo, ResultRepo resultRepo) {
        this.inputRepo = inputRepo;
        this.resultRepo = resultRepo;
    }

    @Override
    public void createInputsKeyword(Long userId, String userKeyWord) {
        List<Result> resultResult = resultRepo.findByUserId(userId).get();

        Input input = new Input();
        input.setResult(resultResult.get(0));
        input.setKeyword(userKeyWord);
        inputRepo.save(input);
    }
}