package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.SimilarCompanyDAO;
import com.ssafy.jobtender.dto.output.ComparableCompanyNameOutputDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.LinkedList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class SimilarCompanyServiceImplTest {
    private final int SIMILAR_COMPANY_MAXIMUM_COUNT = 3;
    @Autowired
    private SimilarCompanyDAO similarCompanyDAO;
    @Test
    void readComparableCompanies() {
        /* given */
        long selectedCompanyId = 1;
        List<ComparableCompanyNameOutputDTO> expected = new LinkedList<>();
        expected.add(new ComparableCompanyNameOutputDTO("LG전자", "3.6"));
        expected.add(new ComparableCompanyNameOutputDTO("카카오", "0.5"));

        /* when */
        /* 유사 기업 리스트 가져오기 */
        List<ComparableCompanyNameOutputDTO> comparableCompanyNameOutputDTOList = similarCompanyDAO.readComparableCompanies(selectedCompanyId);
        /* 리스트가 비었을 경우 null 리턴 */
        if(comparableCompanyNameOutputDTOList == null) {
            return;
        }else{ /* 리스트가 존재할 경우 */
            /* 유사 점수를 기준으로 내림차순 정렬 */
            comparableCompanyNameOutputDTOList.sort((o1, o2) -> {
                int r =  Integer.parseInt(o2.getComparableScore().split("\\.")[0]) - Integer.parseInt(o1.getComparableScore().split("\\.")[0]); // 정수 비교
                if(r == 0) r = Integer.parseInt(o2.getComparableScore().split("\\.")[1]) - Integer.parseInt(o1.getComparableScore().split("\\.")[1]); // 소수 비교
                return r;
            });
            /* 정렬된 유사 기업 반환 */
            if(comparableCompanyNameOutputDTOList.size() <= SIMILAR_COMPANY_MAXIMUM_COUNT){ // 최대 개수 이하인 경우 그대로 반환
//                return comparableCompanyNameOutputDTOList;
            }else{ // 최대 개수 이상인 경우 최대 개수만 반환
                comparableCompanyNameOutputDTOList =  comparableCompanyNameOutputDTOList.subList(0, SIMILAR_COMPANY_MAXIMUM_COUNT);
            }
        }

        /* then */
        for(int i=0;i<expected.size();i++){
            assertEquals(expected.get(i).getName(), comparableCompanyNameOutputDTOList.get(i).getName());
            assertEquals(expected.get(i).getComparableScore(), comparableCompanyNameOutputDTOList.get(i).getComparableScore());
        }
    }
}