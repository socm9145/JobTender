package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepo extends JpaRepository<Result, Long> {
}