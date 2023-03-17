package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.MainScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainScoreRepo extends JpaRepository<MainScore, Long> {
}