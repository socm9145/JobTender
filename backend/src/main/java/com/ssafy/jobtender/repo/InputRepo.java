package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.dto.output.KeywordRandomCompanyOutDto;
import com.ssafy.jobtender.entity.Input;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InputRepo extends JpaRepository<Input, Long> {
    Optional<List<Input>> findAllByResult(long resultId);
}