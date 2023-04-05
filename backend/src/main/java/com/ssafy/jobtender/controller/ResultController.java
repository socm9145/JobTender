package com.ssafy.jobtender.controller;

import com.ssafy.jobtender.dto.input.KeywordRankInputDTO;
import com.ssafy.jobtender.dto.output.*;
import com.ssafy.jobtender.service.*;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/result")
public class ResultController {
    private final ResultService resultService;
    private final SimilarCompanyService similarCompanyService;
    private final CompanyService companyService;
    private final InputService inputService;
    private final UserService userService;
    private final SurveyService surveyService;
    private final KeywordResearchService keywordResearchService;
    private final SurveyResultService surveyResultService;

    @Autowired
    public ResultController(ResultService resultService, SimilarCompanyService similarCompanyService,
                            CompanyService companyService, InputService inputService, UserService userService,
                            SurveyService surveyService, KeywordResearchService keywordResearchService,
                            SurveyResultService surveyResultService){
        this.resultService = resultService;
        this.similarCompanyService = similarCompanyService;
        this.companyService = companyService;
        this.inputService = inputService;
        this.userService = userService;
        this.surveyService = surveyService;
        this.keywordResearchService = keywordResearchService;
        this.surveyResultService = surveyResultService;
    }
    /**
     * [모달 관련 API]
     * 유사한 기업 확인 : 유사한 기업 이름을 3개 반환한다.
     * @params selectedCompanyId : 선택된 기업 아이디
     * @return ComparableCompanyNameOutputDTO
     * */
    @ApiOperation(
            value = "유사한 기업 확인 API (v)"
            , notes = "유사한 기업 이름 3개를 반환한다.")
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
    @ApiOperation(
            value = "키워드별 기업 확인 API (v)"
            , notes = "키워드 당 랜덤으로 n개의 기업을 반환한다.")
    @GetMapping("/keyword/company")
    public ResponseEntity<Map<String, List<KeywordRandomCompanyOutDto>>> readCompaniesByKeywords(@RequestParam long resultId){
        Map<String, List<KeywordRandomCompanyOutDto>> keywordRandomCompanyOutDtoListMap = companyService.readCompaniesByKeywords(resultId);
        return ResponseEntity.status(HttpStatus.OK).body(keywordRandomCompanyOutDtoListMap);
    }

//    @ApiOperation(
//            value = "분석 결과 기업 확인 API"
//            , notes = "키워드로 분석된 기업 3개를 반환한다.")
//    @GetMapping("/company/rank")
//    public ResponseEntity<List<ResultCompanyOutDTO>> readResultsCompanies(@RequestParam("resultId") String resultId){
//        List<ResultCompanyOutDTO> resultCompanyOutDTOList = this.resultService.readResultsCompanies();
//
//        return ResponseEntity.status(HttpStatus.OK).body(resultCompanyOutDTOList);
//    }

    @ApiOperation(
            value = "기업 정보 및 평점 확인 API (v)"
            , notes = "기업 정보 및 평점을 반환한다.")
    @GetMapping("/company/info")
    public ResponseEntity<CompanyRatingOutDTO> readCompanies(@RequestParam("companyId") String companyId){
        CompanyRatingOutDTO companyRatingOutDTO = this.companyService.readCompanies(Long.parseLong(companyId));

        return ResponseEntity.status(HttpStatus.OK).body(companyRatingOutDTO);
    }
    @ApiOperation(
            value = "키워드 순위 API (v)"
            , notes = "모든 사용자가 선택한 전체 키워드 갯수 순위를 정렬해서 반환한다.")
    @GetMapping("/keyword/top")
    public ResponseEntity<List<KeywordOutDTO>> keywordRanking(){
        List<KeywordOutDTO> keywordOutDTOs = this.inputService.keywordRanking();

        return ResponseEntity.status(HttpStatus.OK).body(keywordOutDTOs);
    }

    // API - 성별 키워드 확인
    @ApiOperation(
            value = "성별 키워드 확인 API (v)"
            , notes = "성별을 기준으로 유저의 데이터를 불러온다. M/F를 기준으로 가져온다.")
    @GetMapping("/keyword/gender")
    public ResponseEntity<List<KeywordOutDTO>> keywordRankingByGender(@RequestParam("gender") String gender){
        List<KeywordOutDTO> keywordOutDTOs = this.inputService.keywordRankingByGender(gender);

        return ResponseEntity.status(HttpStatus.OK).body(keywordOutDTOs);
    }

    // API - 나이 키워드 확인
    @ApiOperation(
            value = "나이 키워드 확인 API (v)"
            , notes = "나이를 기준으로 유저의 데이터를 불러온다. 20대는 20, 30대는 30으로 불러온다.")
    @GetMapping("/keyword/age")
    public ResponseEntity<List<KeywordOutDTO>> keywordRankingByAge(@RequestParam("age") int age){
        List<KeywordOutDTO> keywordOutDTOs = this.inputService.keywordRankingByAge(age);

        return ResponseEntity.status(HttpStatus.OK).body(keywordOutDTOs);
    }
    @ApiOperation(value = "설문지 확인 API (v)",
            notes = "모든 설문지 데이터를 불러온다.")
    @GetMapping("/survey")
    public ResponseEntity<List<SurveyOutDTO>> readSurveys(){
        List<SurveyOutDTO> surveyOutDTOs = this.surveyService.readSurveys();

        return ResponseEntity.status(HttpStatus.OK).body(surveyOutDTOs);
    }

    @ApiOperation(value = "통계 자료 확인 API (new)",
    notes = "keywordId, 성별을 기반으로 평균, 표준편차를 반환한다")
    @GetMapping("/static")
    public ResponseEntity<StaticOutDTO> readSurveyByKeywordIdAndGender(@RequestParam("keywordId") long keywordId,
                                                                       @RequestParam("gender") String gender){
        StaticOutDTO staticOutDTO = this.keywordResearchService.readSurveyByKeywordIdAndGender(keywordId, gender);

        return ResponseEntity.status(HttpStatus.OK).body(staticOutDTO);
    }

    @ApiOperation(value = "설문 평점 반환 API (new)",
            notes = "설문의 특정 키워드의 평균값을 반환한다.")
    @GetMapping("/survey/average")
    public ResponseEntity<SurveyAvgOutDTO> readAverageInSurvey(@RequestParam("resultId") long resultId,
                                                               @RequestParam("keywordId") long keywordId){
        SurveyAvgOutDTO staticOutDTO = this.surveyResultService.readAverageInSurvey(resultId, keywordId);

        return ResponseEntity.status(HttpStatus.OK).body(staticOutDTO);
    }

    @ApiOperation(value = "Chart 2 데이터 반환 API", notes = "Chart 2 데이터 반환 API")
    @GetMapping("/survey/c2")
    public ResponseEntity<Chart2OutDTO> readC2ByCompanyId(@RequestParam("companyId") long companyId){
        Chart2OutDTO chart2OutDTO = this.companyService.readC2ByCompanyId(companyId);

        return ResponseEntity.status(HttpStatus.OK).body(chart2OutDTO);
    }

    @ApiOperation(value = "Chart 4 데이터 반환 API", notes = "Chart 4 데이터 반환 API")
    @GetMapping("/survey/c4")
    public ResponseEntity<Chart4WrapOutDTO> readC4ByResultId(@RequestParam("resultId") long resultId){
        List<Chart4OutDTO> chart4OutDTOs = this.resultService.readC4ByResultId(resultId);
        Chart4WrapOutDTO chart4WrapOutDTO = new Chart4WrapOutDTO("flare", chart4OutDTOs);
        return ResponseEntity.status(HttpStatus.OK).body(chart4WrapOutDTO);
    }
    
    @PostMapping("/keyword/rank")
    public ResponseEntity<List<KeywordRankDoubleOutDTO>> readKeywordRank(@RequestBody KeywordRankInputDTO keywordRankInputDTO){
        List<KeywordRankDoubleOutDTO> keywordRankDoubleOutDTOList =resultService.readKeywordRank(keywordRankInputDTO);
        return ResponseEntity.status(HttpStatus.OK).body(keywordRankDoubleOutDTOList);
    }
}