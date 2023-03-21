package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.dto.output.ComparableCompanyNameOutputDTO;
import com.ssafy.jobtender.entity.Company;
import com.ssafy.jobtender.entity.SimilarCompany;
import com.ssafy.jobtender.repo.CompanyRepo;
import com.ssafy.jobtender.repo.SimilarCompanyRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class SimilarCompanyDAOImplTest {
    @Autowired
    private SimilarCompanyRepo similarCompanyRepo;
    @Autowired
    private CompanyRepo companyRepo;
    @Test
    void readComparableCompanies() {
        /* given */
        long selectedCompanyId = 1;
        List<ComparableCompanyNameOutputDTO> expected = new LinkedList<>();
        expected.add(new ComparableCompanyNameOutputDTO("LG전자","3.6"));
        expected.add(new ComparableCompanyNameOutputDTO("카카오","0.5"));

        /* when */
        Optional<List<SimilarCompany>> isSimilarCompany = this.similarCompanyRepo.findAllByCompanyId(selectedCompanyId);
        if(isSimilarCompany.isEmpty()) {
            assertNull(isSimilarCompany.get());
        }
        List<ComparableCompanyNameOutputDTO> comparableCompanyNameOutputDTOList = new LinkedList<>(); // 반환할 DTO 리스트 선언
        List<SimilarCompany> similarCompanies = isSimilarCompany.get(); // 유사 기업 리스트 가져오기
        /* 유사 기업 리스트를 이름,점수가 들어있는 DTO 리스트로 변환 */
        for (SimilarCompany similarCompany : similarCompanies) {
            String comparableScore = similarCompany.getComparableScore(); // 유사 기업 점수 추출
            /* 기업 정보 유무 확인 : 유사 기업 아이디로 기업 정보 가져오기 */
            Optional<Company> isCompany = this.companyRepo.findByCompanyId(similarCompany.getComparableCompany().getCompanyId());
            if (isCompany.isEmpty()) {
                assertNull(isCompany.get());
            }
            Company company = isCompany.get(); // 유사 기업 정보 가져오기
            String companyName = company.getName(); // 기업 이름 추출
            /* 반환할 DTO 생성 및 빌드 */
            ComparableCompanyNameOutputDTO comparableCompanyNameOutputDTO = ComparableCompanyNameOutputDTO.createBuilder()
                    .name(companyName)
                    .comparableScore(comparableScore)
                    .build();

            /* DTO 리스트에 삽입 */
            comparableCompanyNameOutputDTOList.add(comparableCompanyNameOutputDTO);
        }

        /* then */
        for(int i=0;i<expected.size();i++){
            assertEquals(expected.get(i).getName(), comparableCompanyNameOutputDTOList.get(i).getName());
            assertEquals(expected.get(i).getComparableScore(), comparableCompanyNameOutputDTOList.get(i).getComparableScore());
        }
    }
}