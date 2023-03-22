package com.ssafy.jobtender.service;

import java.util.List;

public interface InputService {
    void createInputsKeyword(Long userId, List<String> userKeyWord);
}