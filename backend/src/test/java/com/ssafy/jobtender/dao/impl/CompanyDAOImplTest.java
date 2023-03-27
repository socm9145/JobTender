package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.entity.Company;
import com.ssafy.jobtender.repo.CompanyRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class CompanyDAOImplTest {
    @Autowired
    private CompanyRepo companyRepo;

    @Test
    void readCompaniesByInput() {
        //given
        long inputId = 1;
        List<String> expect = new ArrayList<>();
        expect.add("삼성전자");
        expect.add("LG전자");
        expect.add("카카오");

        //when
        List<Company> companies = companyRepo.findAllByInputId(inputId).get();

        //then
        for(int i=0;i<companies.size();i++){
            assertEquals(expect.get(i), companies.get(i).getName());
        }
    }
}