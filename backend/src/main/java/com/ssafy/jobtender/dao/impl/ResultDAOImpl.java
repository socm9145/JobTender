package com.ssafy.jobtender.dao.impl;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.jobtender.dao.ResultDAO;
import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.entity.QInput;
import com.ssafy.jobtender.entity.QResult;
import com.ssafy.jobtender.entity.Result;
import com.ssafy.jobtender.repo.ResultRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Component
public class ResultDAOImpl implements ResultDAO {
    @PersistenceContext
    private EntityManager em;
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

    @Override
    public List<ReadResultOutDTO> readResultsByUserId() {
        JPAQueryFactory qf = new JPAQueryFactory(em);

        QResult result = QResult.result;
        QInput input = QInput.input;

        System.out.println(qf.selectFrom(result)
                .leftJoin(input)
                .on(result.resultId.eq(input.result.resultId))
                .fetch());

        return null;
    }
}