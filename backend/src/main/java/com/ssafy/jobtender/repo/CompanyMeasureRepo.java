package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.CompanyMeasure;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompanyMeasureRepo extends JpaRepository<CompanyMeasure, Long> {

    Optional<List<CompanyMeasure>> findAllByExtractedKeyword(long extractKeywordId);
}
