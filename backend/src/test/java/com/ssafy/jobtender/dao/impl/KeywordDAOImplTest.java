package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.entity.Keyword;
import com.ssafy.jobtender.repo.KeywordRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class KeywordDAOImplTest {
    @Autowired
    private KeywordRepo keywordRepo;
    @Test
    void readAllKeywords() {
        //given
        List<String> expect = new ArrayList<>();
        expect.add("성실");
        expect.add("열정");
        expect.add("사회공헌");
        expect.add("의지");
        expect.add("배움");
        expect.add("하하");

        //when
        List<Keyword> keywords = keywordRepo.findAll();
        //then
        for(int i=0;i<keywords.size();i++){
            assertEquals(expect.get(i), keywords.get(i).getKeywordName());
        }
    }
}