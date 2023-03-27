package com.ssafy.jobtender.controller;

import com.ssafy.jobtender.dto.input.CreateInputDTO;
import com.ssafy.jobtender.dto.input.KeywordInputDTO;
import com.ssafy.jobtender.dto.input.UpdateUserDTO;
import com.ssafy.jobtender.dto.output.CreateOutputDTO;
import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.dto.output.UserOutDTO;
import com.ssafy.jobtender.entity.Keyword;
import com.ssafy.jobtender.service.InputService;
import com.ssafy.jobtender.service.KeywordService;
import com.ssafy.jobtender.service.ResultService;
import com.ssafy.jobtender.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final InputService inputService;
    private final ResultService resultService;
    private final KeywordService keywordService;

    // 생성자 주입 방식
    @Autowired
    public UserController(UserService userService, InputService inputService,
                          ResultService resultService, KeywordService keywordService) {
        this.userService = userService;
        this.inputService = inputService;
        this.resultService = resultService;
        this.keywordService = keywordService;
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
}

