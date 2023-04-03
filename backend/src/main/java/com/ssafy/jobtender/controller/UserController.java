package com.ssafy.jobtender.controller;

import com.ssafy.jobtender.dao.SurveyResultDAO;
import com.ssafy.jobtender.dto.input.*;
import com.ssafy.jobtender.dto.output.*;
import com.ssafy.jobtender.entity.Keyword;
import com.ssafy.jobtender.service.*;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final InputService inputService;
    private final ResultService resultService;
    private final KeywordService keywordService;
    private final SurveyResultService surveyResultService;
    private final CompanyScoreService companyScoreService;

    // 생성자 주입 방식
    @Autowired
    public UserController(UserService userService, InputService inputService,
                          ResultService resultService, KeywordService keywordService,
                          SurveyResultService surveyResultService, CompanyScoreService companyScoreService) {
        this.userService = userService;
        this.inputService = inputService;
        this.resultService = resultService;
        this.keywordService = keywordService;
        this.surveyResultService = surveyResultService;
        this.companyScoreService = companyScoreService;
    }

    // API - 키워드 선택
    @ApiOperation(
            value = "키워드 선택 API (v)"
            , notes = "유저가 선택한 3개의 키워드를 저장한다. 결과를 반환한다.")
    @PostMapping("/keyword")
    public ResponseEntity<List<CreateOutputDTO>> createInputsKeyword(@RequestParam("userId") Long userId, @RequestBody KeywordInputDTO keywordInputDTO) {
        List<Long> userKeywords = new ArrayList<>();
        List<CreateOutputDTO> createOutputDTOs = new ArrayList<>();

        userKeywords.add(keywordInputDTO.getKeywordId1());
        userKeywords.add(keywordInputDTO.getKeywordId2());
        userKeywords.add(keywordInputDTO.getKeywordId3());

        // Result table 생성 및 pk 반환
        long resultId = resultService.createResult(userId);

        // input table 생성 및 데이터 반환
        for (int i = 0; i < userKeywords.size(); i++){
            CreateInputDTO createInputDTO = new CreateInputDTO(resultId, userKeywords.get(i), i + 1);
            createOutputDTOs.add(inputService.createInputsKeyword(createInputDTO));
        }

        return ResponseEntity.status(HttpStatus.OK).body(createOutputDTOs);
    }
    // API - 전체 키워드 확인
    @ApiOperation(
            value = "전체 키워드 확인 API (v)"
            , notes = "전체 키워드를 반환한다."
            )
    @GetMapping("/keyword")
    public ResponseEntity<List<Keyword>> readAllKeywords(){
        List<Keyword> keywords = keywordService.readAllKeywords();
        return ResponseEntity.status(HttpStatus.OK).body(keywords);
    }

    // API - 회원정보 확인
    @ApiOperation(
            value = "회원 정보 확인 API (v)"
            , notes = "유저id를 기반으로 유저의 정보를 반환한다.")
    @GetMapping("/info")
    public ResponseEntity<UserOutDTO> readUsersByUserId(@RequestParam("userId") Long userId) {
        UserOutDTO userOutDTO = this.userService.readUsersByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userOutDTO);
    }
    
    // API - 회원정보 수정
    @ApiOperation(
            value = "회원 정보 수정 API (사용 안함. 논의 필요)"
            , notes = "유저의 정보를 수정한다. 수정된 유저 정보를 반환한다.")
    @PutMapping("/info")
    public ResponseEntity<UserOutDTO> updateUserByUserId(@RequestBody UpdateUserDTO updateUserDTO){
        UserOutDTO userOutDTO = this.userService.updateUsersByUserId(updateUserDTO);
        return ResponseEntity.status(HttpStatus.OK).body(userOutDTO);
    }
    
    // API - 회원정보 삭제
    @ApiOperation(
            value = "회원 정보 삭제 API (v)"
            , notes = "유저의 정보를 삭제한다. 삭제 성공 여부를 Boolean으로 반환한다.")
    @DeleteMapping("/info")
    public ResponseEntity<Boolean> deleteUserByUserId(@RequestParam("userId") Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.deleteUserByUserId(userId));
    }
    // API - 분석 기록 확인
    @ApiOperation(
            value = "분석 기록 확인 API (v)"
            , notes = "유저의 이전 분석 기록을 반환한다. 이전 분석 기록 하나당 3개의 최적합 회사를 가져온다.")
    @GetMapping("/history")
    public ResponseEntity<List<ReadResultOutDTO>> readResultsByUserId(@RequestParam("userId") Long userId){
        List<ReadResultOutDTO> readResultOutDTO = this.resultService.readResultsByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(readResultOutDTO);
    }

    @ApiOperation(
            value = "분석 기록 요약 확인 API "
            , notes = "유저의 이전 분석 기록을 반환한다. 이전 분석 기록 하나당 3개의 최적합 회사를 가져온다.")
    @GetMapping("/history/summary")
    public ResponseEntity<Map<Long, HistoryOutDTO>> readHistoriesByUserId(@RequestParam("userId") Long userId){
        Map<Long, HistoryOutDTO> historyOutDTOMap = this.resultService.readHistoriesByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(historyOutDTOMap);
    }
    @ApiOperation(
            value = "설문 분석 기록 확인 API"
            , notes = "유저의 이전 설문 분석 기록을 반환한다. 이전 분석 기록 하나당 3개의 최적합 회사를 가져온다.")
    @GetMapping("/survey-history")
    public ResponseEntity<List<ReadResultOutDTO>> readSurveyResultsByUserId(@RequestParam("userId") Long userId){
        List<ReadResultOutDTO> readResultOutDTO = this.resultService.readSurveyResultsByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(readResultOutDTO);
    }

    @ApiOperation(value = "결과 생성 API (new) (v)",
            notes = "Results 테이블에 컬럼을 하나 생성한다. " +
            "연결되는 User 객체 필드에 oauthId가 반드시 있어야 작동한다.")
    @GetMapping("/result")
    public ResponseEntity<ResultOutputDTO> insertResult(long userId){
        ResultOutputDTO resultOutputDTO = this.resultService.insertResult(userId);

        return ResponseEntity.status(HttpStatus.OK).body(resultOutputDTO);
    }

    @ApiOperation(value = "설문조사 기록 저장 API (new) (v)",
            notes = "유저의 설문조사 기록을 저장한다.")
    @PostMapping("/survey")
    public ResponseEntity<List<SurveyResultOutputDTO>> insertSurveyByResultId(@RequestBody List<SurveyResultInputDTO> surveyResultInputDTOs){
        List<SurveyResultOutputDTO> surveyResultOutputDTOs = this.surveyResultService.insertSurveyByResultId(surveyResultInputDTOs);
        return ResponseEntity.status(HttpStatus.OK).body(surveyResultOutputDTOs);
    }


    @ApiOperation(value = "설문조사 기록 확인 API (new) (v)",
            notes = "유저의 설문조사 기록을 불러온다. resultId를 기반으로 불러온다.")
    @GetMapping("/survey")
    public ResponseEntity<List<SurveyResultOutputDTO>> readSurveyByResultId(@RequestParam("resultId") long resultId){
        List<SurveyResultOutputDTO> surveyResultOutputDTOs = this.surveyResultService.readSurveyByResultId(resultId);

        return ResponseEntity.status(HttpStatus.OK).body(surveyResultOutputDTOs);
    }

    @ApiOperation(value = "결과 기반 연관 기업 확인 API (new) (v)",
    notes = "유저의 분석 결과를 기반으로 연관된 기업을 확인한다.")
    @GetMapping("/survey/company")
    public ResponseEntity<List<TfIdfOutDTO>> readTfIdfValueByResultId(@RequestParam("resultId") long resultId){
        List<TfIdfOutDTO> tfIdfOutDTOs = this.companyScoreService.readTfIdfValueByResultId(resultId);

        return ResponseEntity.status(HttpStatus.OK).body(tfIdfOutDTOs);
    }
}

