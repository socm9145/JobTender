package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.dao.ResultDAO;
import com.ssafy.jobtender.entity.Result;
import com.ssafy.jobtender.repo.ResultRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ResultDAOImpl implements ResultDAO {
    private final ResultRepo resultRepo;
    @Autowired
    public ResultDAOImpl(ResultRepo resultRepo) {
        this.resultRepo = resultRepo;
    }

    @Override
    public void createResult() {
        Result result = new Result();
        this.resultRepo.save(result);
    }
}