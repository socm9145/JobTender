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
    private final KeywordMeasureDAO keywordMeasureDAO;
    private final CompanyMeasureDAO companyMeasureDAO;

    public CompanyServiceImpl(CompanyDAO companyDAO, InputDAO inputDAO, KeywordMeasureDAO keywordMeasureDAO, CompanyMeasureDAO companyMeasureDAO){
        this.companyDAO = companyDAO;
        this.inputDAO = inputDAO;
        this.keywordMeasureDAO = keywordMeasureDAO;
        this.companyMeasureDAO = companyMeasureDAO;
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
        Map<String, List<KeywordRandomCompanyOutDto>> keywordRandomCompanyOutDtoListMap = new HashMap<>();
        List<Input> inputs = inputDAO.readInputsByResultId(resultId);
        for(Input input : inputs){
            Keyword keyword = input.getKeyword();
            long keywordId = keyword.getKeywordId();
            String keywordName = keyword.getKeyword();
            Set<Long> companyIdSet = new HashSet<>();
            List<KeywordMeasure> keywordMeasures = keywordMeasureDAO.readExtractedKeywordsByKeywordId(input.getKeyword().getKeywordId());
            int keywordMeasuresLimitedSize = 0;
            if(keywordMeasures.size() < EXTRACTED_KEYWORD_MAXIMUM_COUNT){
                keywordMeasuresLimitedSize = keywordMeasures.size();
            }else{
                keywordMeasures.sort((o1, o2)->{
                    int r = Integer.parseInt(o2.getScore().split("\\.")[0]) - Integer.parseInt(o1.getScore().split("\\.")[0]);
                    if(r == 0) r = Integer.parseInt(o2.getScore().split("\\.")[1]) - Integer.parseInt(o1.getScore().split("\\.")[1]);
                    return r;
                });
                keywordMeasuresLimitedSize = EXTRACTED_KEYWORD_MAXIMUM_COUNT;
            }
            List<KeywordRandomCompanyOutDto> keywordRandomCompanyOutDtoList = new LinkedList<>();
            for(int i=0;i<keywordMeasuresLimitedSize;i++){
                List<CompanyMeasure> companyMeasures = companyMeasureDAO.readCompanyMeasuresByExtractedKeywordId(keywordMeasures.get(i).getExtractedKeyword().getExtractKeywordId());
                for(CompanyMeasure companyMeasure : companyMeasures){
                    Company company = companyMeasure.getCompany();
                    long companyId = company.getCompanyId();
                    String companyName = company.getName();
                    if(!companyIdSet.contains(companyId)){
                        companyIdSet.add(companyId);
                        KeywordRandomCompanyOutDto keywordRandomCompanyOutDto = new KeywordRandomCompanyOutDto(companyId, keywordId, companyName, keywordName);
                        keywordRandomCompanyOutDtoList.add(keywordRandomCompanyOutDto);
                    }
                }
            }
            keywordRandomCompanyOutDtoListMap.put(keywordName, keywordRandomCompanyOutDtoList);
        }
        return keywordRandomCompanyOutDtoListMap;
    }
}