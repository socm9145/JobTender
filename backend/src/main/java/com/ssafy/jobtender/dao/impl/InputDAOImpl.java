package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.entity.Input;
import com.ssafy.jobtender.entity.Keyword;
import com.ssafy.jobtender.entity.Result;
import com.ssafy.jobtender.repo.InputRepo;
import com.ssafy.jobtender.dao.InputDAO;
import com.ssafy.jobtender.repo.KeywordRepo;
import com.ssafy.jobtender.repo.ResultRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.security.Key;
import java.util.List;
import java.util.Optional;

@Component
public class InputDAOImpl implements InputDAO{
    @PersistenceContext
    private EntityManager em;
    private final InputRepo inputRepo;
    private final ResultRepo resultRepo;
    private final KeywordRepo keywordRepo;
    @Autowired
    public InputDAOImpl(InputRepo inputRepo, ResultRepo resultRepo, KeywordRepo keywordRepo) {
        this.inputRepo = inputRepo;
        this.resultRepo = resultRepo;
        this.keywordRepo = keywordRepo;
    }

    @Override
    public void createInputsKeyword(Long userId, long userKeyWord) {
        List<Result> resultResult = resultRepo.findByUserId(userId).get();
        Keyword keyword = keywordRepo.findById(userKeyWord).get();

        Input input = new Input();
        input.setResult(resultResult.get(0));
        input.setKeyword(keyword);
        inputRepo.save(input);
    }

    @Override
    public Input readInputsByResultId(long resultId) {
        Optional<Input> isInput = inputRepo.findByResult(resultId);
        if(isInput.isEmpty()){
            return null;
        }else{
            Input input = isInput.get();
            return input;
        }
    }
}