package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.CompanyMeasure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CompanyMeasureRepo extends JpaRepository<CompanyMeasure, Long> {
    @Query("SELECT CM from CompanyMeasure CM WHERE CM.extractedKeyword.extractKeywordId = :extractKeywordId")
    Optional<List<CompanyMeasure>> findAllByExtractedKeyword(@Param("extractKeywordId") long extractKeywordId);
}
