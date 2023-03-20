package com.ssafy.jobtender.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
public class AccountController {
    @GetMapping("/{nickname}")
    public ResponseEntity<Boolean> getNicknameExist(@PathVariable("nickname") long memberSeq) {
        //return ResponseEntity.status(HttpStatus.OK).body(memberService.getMember(memberSeq));
        return null;
    }
}
