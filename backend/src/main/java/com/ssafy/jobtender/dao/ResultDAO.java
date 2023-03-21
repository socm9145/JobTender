package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.dto.output.ReadResultOutDTO;

import java.util.List;
import java.util.Optional;

public interface ResultDAO {
    void createResult();
    List<ReadResultOutDTO> readResultsByUserId();
}