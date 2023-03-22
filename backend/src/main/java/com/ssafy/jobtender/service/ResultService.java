package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.output.ReadResultOutDTO;

import java.util.List;

public interface ResultService {
    void createResult(Long userId);
    List<ReadResultOutDTO> readResultsByUserId();
}