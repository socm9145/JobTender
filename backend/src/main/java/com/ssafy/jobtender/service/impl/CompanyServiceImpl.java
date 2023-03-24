package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.CompanyDAO;
import com.ssafy.jobtender.dao.CompanyMeasureDAO;
import com.ssafy.jobtender.dao.InputDAO;
import com.ssafy.jobtender.dao.KeywordMeasureDAO;
import com.ssafy.jobtender.dto.output.CompanyRatingOutDTO;
import com.ssafy.jobtender.dto.output.KeywordRandomCompanyOutDto;
import com.ssafy.jobtender.entity.*;
import com.ssafy.jobtender.service.CompanyService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CompanyServiceImpl implements CompanyService {
    private final int EXTRACTED_KEYWORD_MAXIMUM_COUNT = 3;
    private final CompanyDAO companyDAO;
    private final InputDAO inputDAO;

    public CompanyServiceImpl(CompanyDAO companyDAO, InputDAO inputDAO){
        this.companyDAO = companyDAO;
        this.inputDAO = inputDAO;
    }
    @Override
    public CompanyRatingOutDTO readCompanies(long companyId) {
        return this.companyDAO.readCompanies(companyId);
    }

    /**
     * 사용자가 입력한 키워드 별로 기업 리스트를 Map 형식으로 반환한다.
     * @param resultId long : 분석 결과 아이디
     * @return Map<String, List<KeywordRandomCompanyOutDto>> : {키워드 이름 : [회사 리스트]}
     * */
    @Override
    public Map<String, List<KeywordRandomCompanyOutDto>> readCompaniesByKeywords(long resultId) {
//        Map<String, List<KeywordRandomCompanyOutDto>> keywordRandomCompanyOutDtoListMap = new HashMap<>();
//        List<Input> inputs = inputDAO.readInputsByResultId(resultId);
//        if(inputs == null){
//            return null;
//        }
//        for(Input input : inputs){
//            List<KeywordRandomCompanyOutDto> keywordRandomCompanyOutDtoList = new ArrayList<>();
//            String keywordName = input.getKeyword().getKeyword();
//            List<Company> companies = companyDAO.readCompaniesByInputId(input.getInputId());
//            for(Company company : companies){
//                keywordRandomCompanyOutDtoList.add(new KeywordRandomCompanyOutDto(company.getCompanyId(), input.getKeyword().getKeywordId(), company.getName(), keywordName));
//            }
//            keywordRandomCompanyOutDtoListMap.put(keywordName, keywordRandomCompanyOutDtoList);
//        }
//        return keywordRandomCompanyOutDtoListMap;
        return null;
    }
}