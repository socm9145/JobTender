package com.ssafy.jobtender.controller;

import com.ssafy.jobtender.dto.input.KeywordInputDTO;
import com.ssafy.jobtender.service.InputService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final InputService inputService;

    @Autowired
    public UserController(InputService inputService) {
        this.inputService = inputService;
    }
    @ResponseBody
    @PostMapping("/keyword")
    public void createInputsKeyword(@RequestBody KeywordInputDTO keywordInputDTO){
        List<String> userKeyWord = keywordInputDTO.getKeyWords();

    }
}
