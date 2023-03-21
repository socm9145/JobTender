package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.dao.SimilarCompanyDAO;
import com.ssafy.jobtender.dto.output.ComparableCompanyNameOutputDTO;
import com.ssafy.jobtender.entity.Company;
import com.ssafy.jobtender.entity.SimilarCompany;
import com.ssafy.jobtender.repo.CompanyRepo;
import com.ssafy.jobtender.repo.SimilarCompanyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Component
public class SimilarCompanyDAOImpl implements SimilarCompanyDAO {
    /* 유사 기업, 기업 테이블 관련 repo */
    private final SimilarCompanyRepo similarCompanyRepo;
    private final CompanyRepo companyRepo;
    @Autowired
    public SimilarCompanyDAOImpl(SimilarCompanyRepo similarCompanyRepo, CompanyRepo companyRepo) {
        this.similarCompanyRepo = similarCompanyRepo;
        this.companyRepo = companyRepo;
    }
    /**
     * 유사 기업 반환 : 선택된 기업과 유사한 기업의 이름 및 유사 점수를 반환한다.
     *
     * @param selected_company_id long: 선택된 기업 아이디
     * @return List<ComparableCompanyNameOutputDTO> : 기업 이름 리스트
     */
    @Override
    public List<ComparableCompanyNameOutputDTO> readComparableCompanies(long selected_company_id) {
        /* 유사 기업 유무 확인 */
        Optional<List<SimilarCompany>> isSimilarCompany = this.similarCompanyRepo.findAllByCompanyId(selected_company_id);
        if (isSimilarCompany.isEmpty()) {
            return null;
        }
        List<ComparableCompanyNameOutputDTO> comparableCompanyNameOutputDTOList = new LinkedList<>(); // 반환할 DTO 리스트 선언
        List<SimilarCompany> similarCompanies = isSimilarCompany.get(); // 유사 기업 리스트 가져오기
        /* 유사 기업 리스트를 이름,점수가 들어있는 DTO 리스트로 변환 */
        for (SimilarCompany similarCompany : similarCompanies) {
            String comparableScore = similarCompany.getComparableScore(); // 유사 기업 점수 추출
            /* 기업 정보 유무 확인 : 유사 기업 아이디로 기업 정보 가져오기 */
            Optional<Company> isCompany = this.companyRepo.findByCompanyId(similarCompany.getSimilarCompanyId());
            if (isCompany.isEmpty()) {
                return null;
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
        /* DTO 리스트 반환 */
        return comparableCompanyNameOutputDTOList;
    }
}
