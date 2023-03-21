package com.ssafy.jobtender.controller;

import com.ssafy.jobtender.dto.output.ComparableCompanyNameOutputDTO;
import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.service.InputService;
import com.ssafy.jobtender.service.ResultService;
import com.ssafy.jobtender.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/result")
public class ResultController {
    private final ResultService resultService;

    @Autowired
    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }
    /**
     * [모달 관련 API]
     * 유사한 기업 확인 : 유사한 기업 이름을 3개 반환한다.
     * @params selected_company_id : 선택된 기업 아이디
     * @return ComparableCompanyNameOutputDTO
     * */
    @GetMapping("/company/similar")
    public ResponseEntity<ComparableCompanyNameOutputDTO> readComparableCompanies(@RequestParam long selected_company_id){
        //
        return null;
    }

    @GetMapping("/company/hosung")
    public ResponseEntity<List<ReadResultOutDTO>> readResultsByUserId(){
        List<ReadResultOutDTO> readResultOutDTO = this.resultService.readResultsByUserId();
        return ResponseEntity.status(HttpStatus.OK).body(readResultOutDTO);
    }
}
