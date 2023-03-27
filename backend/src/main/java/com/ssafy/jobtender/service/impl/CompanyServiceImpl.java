package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.CompanyDAO;
import com.ssafy.jobtender.dao.InputDAO;
import com.ssafy.jobtender.dto.output.CompanyRatingOutDTO;
import com.ssafy.jobtender.dto.output.KeywordRandomCompanyOutDto;
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
        Map<String, List<KeywordRandomCompanyOutDto>> keywordRandomCompanyOutDtoListMap = new HashMap<>();
        List<KeywordRandomCompanyOutDto> keywordCompanyOutDtoList = companyDAO.readKeywordCompaniesByResultId(resultId);

        Map<String, int[]> keywordRandomCompanyOutDtoRangeMap = new HashMap<>();
        for(int i=0;i<keywordCompanyOutDtoList.size();i++){
            KeywordRandomCompanyOutDto keywordRandomCompanyOutDto = keywordCompanyOutDtoList.get(i);
            if(!keywordRandomCompanyOutDtoRangeMap.containsKey(keywordRandomCompanyOutDto.getKeywordName())){
                keywordRandomCompanyOutDtoRangeMap.put(keywordRandomCompanyOutDto.getKeywordName(), new int[]{i, i});
            }else{
                keywordRandomCompanyOutDtoRangeMap.get(keywordRandomCompanyOutDto.getKeywordName())[1] = i;
            }
        }
        keywordRandomCompanyOutDtoRangeMap.forEach((key, ranges) -> {
            int companyCount = ranges[1] - ranges[0] + 1;
            List<KeywordRandomCompanyOutDto> keywordRandomCompanyOutDtoList = new ArrayList<>();
            if(companyCount <= EXTRACTED_KEYWORD_MAXIMUM_COUNT){ // dto 수가 최대 개수보다 작거나 같을 경우
                for(int i=ranges[0];i<=ranges[1];i++){
                    keywordRandomCompanyOutDtoList.add(keywordCompanyOutDtoList.get(i));
                }
                keywordRandomCompanyOutDtoListMap.put(key, keywordRandomCompanyOutDtoList);
            }else{// dto 수가 최대 개수보다 클 때 (랜덤으로 선택하기)
                Random random = new Random();
                Set<Integer> numberSet = new HashSet<>();
                for(int i=0;i<keywordCompanyOutDtoList.size();i++){
                    if(numberSet.size() == EXTRACTED_KEYWORD_MAXIMUM_COUNT){
                        break;
                    }
                    int randomNumber = random.nextInt(companyCount)+ranges[0];
                    numberSet.add(randomNumber);
                }
                numberSet.forEach((index) -> {
                    keywordRandomCompanyOutDtoList.add(keywordCompanyOutDtoList.get(index));
                });
                keywordRandomCompanyOutDtoListMap.put(key, keywordRandomCompanyOutDtoList);
            }
        });
        return keywordRandomCompanyOutDtoListMap;
    }
}