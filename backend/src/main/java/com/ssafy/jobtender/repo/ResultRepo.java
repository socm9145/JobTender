package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.dto.output.ReadResultOutDTO;
import com.ssafy.jobtender.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResultRepo extends JpaRepository<Result, Long> {
}