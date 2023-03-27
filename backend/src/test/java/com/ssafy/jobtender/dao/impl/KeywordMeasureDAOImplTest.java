package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.entity.KeywordMeasure;
import com.ssafy.jobtender.repo.KeywordMeasureRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class KeywordMeasureDAOImplTest {
    @Autowired
    private KeywordMeasureRepo keywordMeasureRepo;
    @Test
    void readExtractedKeywordsByKeywordId() {
        long keywordId = 2;
        Optional<List<KeywordMeasure>> isKeywordMeasure = keywordMeasureRepo.findAllByKeyword(keywordId);
        if(isKeywordMeasure.isEmpty()) {
            assertNull(isKeywordMeasure.get());
        }else {
            List<KeywordMeasure> keywordMeasures = isKeywordMeasure.get();
            assertEquals(1, keywordMeasures.get(0).getExtractedKeyword().getExtractKeywordId());
        }
    }
}