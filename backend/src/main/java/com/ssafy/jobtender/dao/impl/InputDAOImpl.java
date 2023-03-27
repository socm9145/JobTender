package com.ssafy.jobtender.dao.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.ssafy.jobtender.dto.input.CreateInputDTO;
import com.ssafy.jobtender.dto.input.KeywordInputDTO;
import com.ssafy.jobtender.dto.output.CompanyRatingOutDTO;
import com.ssafy.jobtender.dto.output.CreateOutputDTO;
import com.ssafy.jobtender.dto.output.KeywordOutDTO;
import com.ssafy.jobtender.entity.*;
import com.ssafy.jobtender.repo.InputRepo;
import com.ssafy.jobtender.dao.InputDAO;
import com.ssafy.jobtender.repo.KeywordRepo;
import com.ssafy.jobtender.repo.ResultRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.security.Key;
import java.util.*;

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
    public CreateOutputDTO createInputsKeyword(CreateInputDTO createInputDTO) {
        // need builder
        Input input = new Input();
        CreateOutputDTO createOutputDTO = new CreateOutputDTO();

        input.setKeywordRank(createInputDTO.getKeywordRank());
        input.setKeyword(this.keywordRepo.findById(createInputDTO.getKeywordId()).get());
        input.setResult(this.resultRepo.findById(createInputDTO.getResultId()).get());

        this.inputRepo.save(input);

        createOutputDTO.setInputId(input.getInputId());
        createOutputDTO.setResultId(input.getResult().getResultId());
        createOutputDTO.setKeywordId(input.getKeyword().getKeywordId());
        createOutputDTO.setKeywordRank(input.getKeywordRank());

        return createOutputDTO;
    }

    @Override
    public List<Input> readInputsByResultId(long resultId) {
        Optional<List<Input>> isInput = inputRepo.findAllByResult(resultId);
        if(isInput.isEmpty()){
            return null;
        }else{
            List<Input> inputs = isInput.get();
            return inputs;
        }
    }

    @Override
    public List<Input> readKeywordAll() {
        return this.inputRepo.findAll();
    }

    @Override
    public List<KeywordOutDTO> keywordRankingByGender(String gender) {
        QUser user = QUser.user;
        QResult result = QResult.result;
        QInput input = QInput.input;

        Map<Long, Integer> map = new HashMap<>();
        PriorityQueue<KeywordOutDTO> pq = new PriorityQueue<>((x, y)-> Math.toIntExact(y.getCount() - x.getCount()));
        List<KeywordOutDTO> keywordOutDTOs = new ArrayList<>();

        List<Long> keywords = new JPAQuery<>(em)
                .select(Projections.constructor(Long.class, input.keyword.keywordId))
                .from(user)
                .join(result)
                .on(user.userId.eq(result.user.userId))
                .join(input)
                .on(input.result.resultId.eq(result.resultId))
                .where(user.gender.eq(gender))
                .fetch();

        for (Long keyword : keywords) {
            if (map.containsKey(keyword))
                map.put(keyword, map.get(keyword) + 1);

            else
                map.put(keyword, 1);
        }

        for (long key : map.keySet()){
            pq.offer(new KeywordOutDTO(key, map.get(key)));
        }

        while(!pq.isEmpty())
            keywordOutDTOs.add(pq.poll());

        System.out.println(keywordOutDTOs.size());

        return keywordOutDTOs;
    }

    @Override
    public List<KeywordOutDTO> keywordRankingByAge(int age) {
        QUser user = QUser.user;
        QResult result = QResult.result;
        QInput input = QInput.input;

        Map<Long, Integer> map = new HashMap<>();
        PriorityQueue<KeywordOutDTO> pq = new PriorityQueue<>((x, y)-> Math.toIntExact(y.getCount() - x.getCount()));
        List<KeywordOutDTO> keywordOutDTOs = new ArrayList<>();

        List<Long> keywords = new JPAQuery<>(em)
                .select(Projections.constructor(Long.class, input.keyword.keywordId))
                .from(user)
                .join(result)
                .on(user.userId.eq(result.user.userId))
                .join(input)
                .on(input.result.resultId.eq(result.resultId))
                .where(user.age.eq(age))
                .fetch();

        for (Long keyword : keywords) {
            if (map.containsKey(keyword))
                map.put(keyword, map.get(keyword) + 1);

            else
                map.put(keyword, 1);
        }

        for (long key : map.keySet()){
            pq.offer(new KeywordOutDTO(key, map.get(key)));
        }

        while(!pq.isEmpty())
            keywordOutDTOs.add(pq.poll());

        return keywordOutDTOs;
    }
}