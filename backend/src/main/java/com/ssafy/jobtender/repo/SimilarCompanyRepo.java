package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.SimilarCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SimilarCompanyRepo extends JpaRepository<SimilarCompany, Long> {
}