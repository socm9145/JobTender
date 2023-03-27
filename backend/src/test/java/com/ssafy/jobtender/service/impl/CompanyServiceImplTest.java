package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.CompanyDAO;
import com.ssafy.jobtender.dao.InputDAO;
import com.ssafy.jobtender.dto.output.KeywordRandomCompanyOutDto;
import com.ssafy.jobtender.entity.Company;
import com.ssafy.jobtender.entity.Input;
import com.ssafy.jobtender.entity.Keyword;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class CompanyServiceImplTest {
    private final int EXTRACTED_KEYWORD_MAXIMUM_COUNT = 3;
    @Autowired
    private CompanyDAO companyDAO;
    @Autowired
    private InputDAO inputDAO;

    @Test
    void readCompaniesByKeywords() {
        //given
        long resultId = 1;
        int expectNum = 9;
        List<String> expect = new ArrayList<>();
        expect.add("삼성전자");
        expect.add("LG전자");
        expect.add("카카오");

        //when
        Map<String, List<KeywordRandomCompanyOutDto>> keywordRandomCompanyOutDtoListMap = new HashMap<>();
        List<KeywordRandomCompanyOutDto> keywordRandomCompanyOutDtoList = companyDAO.readKeywordCompaniesByResultId(resultId);

        //then
        assertEquals(expectNum, keywordRandomCompanyOutDtoList.size());
        for(int i=0;i<keywordRandomCompanyOutDtoList.size();i++){
            assertEquals(expect.get(i%3), keywordRandomCompanyOutDtoList.get(i).getCompanyName());
        }
    }
}