package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.SimilarCompanyDAO;
import com.ssafy.jobtender.dao.impl.SimilarCompanyDAOImpl;
import com.ssafy.jobtender.dto.output.ComparableCompanyNameOutputDTO;
import com.ssafy.jobtender.service.SimilarCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SimilarCompanyServiceImpl implements SimilarCompanyService {
    /* 유사 기업 DAO */
    private final SimilarCompanyDAO similarCompanyDAO;
    @Autowired
    public SimilarCompanyServiceImpl(SimilarCompanyDAO similarCompanyDAO){
        this.similarCompanyDAO = similarCompanyDAO;
    }
    /**
     * 선택된 회사의 유사 기업을 가져와 점수 순으로 내림차순 정렬한 후 유사 기업 리스트를 반환한다.
     * @param selected_company_id long : 선택된 회사 아이디
     * @return List<ComparableCompanyNameOutputDTO> : 내림차순 정렬된 유사 기업 리스트
     * */
    @Override
    public List<ComparableCompanyNameOutputDTO> readComparableCompanies(long selected_company_id) {
        /* 유사 기업 리스트 가져오기 */
        List<ComparableCompanyNameOutputDTO> comparableCompanyNameOutputDTOList = similarCompanyDAO.readComparableCompanies(selected_company_id);
        /* 리스트가 비었을 경우 null 리턴 */
        if(comparableCompanyNameOutputDTOList == null) {
            return null;
        }else{ /* 리스트가 존재할 경우 */
            /* 유사 점수를 기준으로 내림차순 정렬 */
            comparableCompanyNameOutputDTOList.sort((o1, o2) -> {
                int r =  Integer.parseInt(o2.getComparableScore().split(".")[0]) - Integer.parseInt(o1.getComparableScore().split(".")[0]); // 정수 비교
                if(r == 0) r = Integer.parseInt(o2.getComparableScore().split(".")[1]) - Integer.parseInt(o1.getComparableScore().split(".")[1]); // 소수 비교
                return r;
            });
            /* 정렬된 유사 기업 반환 */
            return comparableCompanyNameOutputDTOList;
        }
    }
}