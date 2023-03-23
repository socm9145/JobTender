package com.ssafy.jobtender.controller;

import com.ssafy.jobtender.dto.output.*;
import com.ssafy.jobtender.service.CompanyService;
import com.ssafy.jobtender.service.ResultService;
import com.ssafy.jobtender.service.SimilarCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/result")
public class ResultController {
    private final ResultService resultService;
    private final SimilarCompanyService similarCompanyService;
    private final CompanyService companyService;

    @Autowired
    public ResultController(ResultService resultService, SimilarCompanyService similarCompanyService, CompanyService companyService){
        this.resultService = resultService;
        this.similarCompanyService = similarCompanyService;
        this.companyService = companyService;
    }
    /**
     * [모달 관련 API]
     * 유사한 기업 확인 : 유사한 기업 이름을 3개 반환한다.
     * @params selectedCompanyId : 선택된 기업 아이디
     * @return ComparableCompanyNameOutputDTO
     * */
    @GetMapping("/company/similar")
    public ResponseEntity<List<ComparableCompanyNameOutputDTO>> readComparableCompanies(@RequestParam long selectedCompanyId){
        List<ComparableCompanyNameOutputDTO> comparableCompanyNameOutputDTOList = similarCompanyService.readComparableCompanies(selectedCompanyId);
        return ResponseEntity.status(HttpStatus.OK).body(comparableCompanyNameOutputDTOList);
    }

    /**
     * [결과페이지 관련 API]
     * 키워드별 기업 확인 : 키워드 별로 해당하는 기업리스트를 반환한다.
     * @param resultId long : 분석 결과 아아디
     * @return Map<String, List<KeywordRandomCompanyOutDto>> : {키워드 이름 : [회사 리스트]}
     * */
    @GetMapping("/keyword/company")
    public ResponseEntity<Map<String, List<KeywordRandomCompanyOutDto>>> readCompaniesByKeywords(@RequestParam long resultId){
        Map<String, List<KeywordRandomCompanyOutDto>> keywordRandomCompanyOutDtoListMap = companyService.readCompaniesByKeywords(resultId);
        return ResponseEntity.status(HttpStatus.OK).body(keywordRandomCompanyOutDtoListMap);
    }

    @GetMapping("/company/rank")
    public ResponseEntity<List<ResultCompanyOutDTO>> readResultsCompanies(@RequestParam("resultId") String resultId){
        List<ResultCompanyOutDTO> resultCompanyOutDTOList = this.resultService.readResultsCompanies();

        return ResponseEntity.status(HttpStatus.OK).body(resultCompanyOutDTOList);
    }

    @GetMapping("/company/info")
    public ResponseEntity<CompanyRatingOutDTO> readCompanies(@RequestParam("companyId") String companyId){
        CompanyRatingOutDTO companyRatingOutDTO = this.companyService.readCompanies(Long.parseLong(companyId));

        return ResponseEntity.status(HttpStatus.OK).body(companyRatingOutDTO);
    }
}