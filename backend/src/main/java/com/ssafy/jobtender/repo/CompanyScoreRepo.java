package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.CompanyScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyScoreRepo extends JpaRepository<CompanyScore, Long> {

}