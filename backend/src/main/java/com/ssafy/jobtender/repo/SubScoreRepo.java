package com.ssafy.jobtender.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubScoreRepo extends JpaRepository<SubScore, Long> {
}