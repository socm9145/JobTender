package com.ssafy.jobtender.controller;

import com.ssafy.jobtender.dto.input.KeywordInputDTO;
import com.ssafy.jobtender.dto.input.UpdateUserDTO;
import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.dto.output.UserOutDTO;
import com.ssafy.jobtender.service.InputService;
import com.ssafy.jobtender.service.ResultService;
import com.ssafy.jobtender.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final InputService inputService;
    private final ResultService resultService;

    // 생성자 주입 방식
    @Autowired
    public UserController(UserService userService, InputService inputService, ResultService resultService) {
        this.userService = userService;
        this.inputService = inputService;
        this.resultService = resultService;
    }

    // API - 키워드 선택
    @PostMapping("/keyword")
    public ResponseEntity<Void> createInputsKeyword(@RequestParam("userId") Long userId, @RequestBody KeywordInputDTO keywordInputDTO) {
        List<String> userKeyWord = keywordInputDTO.getKeyWords();
        if (!userKeyWord.isEmpty()) {
            resultService.createResult(userId);
            inputService.createInputsKeyword(userId, userKeyWord);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // API - 회원정보 확인
    @GetMapping("/info")
    public ResponseEntity<UserOutDTO> readUsersByUserId(@RequestParam("userId") String userId) {
        UserOutDTO userOutDTO = this.userService.readUsersByUserId(Long.parseLong(userId));
        return ResponseEntity.status(HttpStatus.OK).body(userOutDTO);
    }
    
    // API - 회원정보 수정
    @PutMapping("/info")
    public ResponseEntity<UserOutDTO> updateUserByUserId(@RequestBody UpdateUserDTO updateUserDTO){
        UserOutDTO userOutDTO = this.userService.updateUsersByUserId(updateUserDTO);
        return ResponseEntity.status(HttpStatus.OK).body(userOutDTO);
    }
    
    // API - 회원정보 삭제
    @DeleteMapping("/info")
    public ResponseEntity<Boolean> deleteUserByUserId(@RequestParam("userId") String userId){
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.deleteUserByUserId(Long.parseLong(userId)));
    }
    // API - 분석 기록 확인
    @GetMapping("/history")
    public ResponseEntity<List<ReadResultOutDTO>> readResultsByUserId(){
        List<ReadResultOutDTO> readResultOutDTO = this.resultService.readResultsByUserId();
        return ResponseEntity.status(HttpStatus.OK).body(readResultOutDTO);
    }

    // API - 성별 키워드 확인
    @GetMapping("/keyword/gender")
    public ResponseEntity<List<UserOutDTO>> keywordRankingByGender(@RequestParam("gender") String gender){
        List<UserOutDTO> userOutDTOs = this.userService.keywordRankingByGender(gender);
        return ResponseEntity.status(HttpStatus.OK).body(userOutDTOs);
    }

    @GetMapping("/keyword/age")
    public ResponseEntity<List<UserOutDTO>> keywordRankingByAge(@RequestParam("age") String age){
        List<UserOutDTO> userOutDTOs = this.userService.keywordRankingByAge(Integer.parseInt(age));
        return ResponseEntity.status(HttpStatus.OK).body(userOutDTOs);
    }
}
