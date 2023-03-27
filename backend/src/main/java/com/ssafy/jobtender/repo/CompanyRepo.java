package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepo extends JpaRepository<Company, Long> {
    Optional<Company> findByCompanyId(long companyId);
    @Query("select distinct C " +
            "from Input as I " +
            "join KeywordMeasure as KM " +
            "on I.keyword.keywordId = KM.keyword.keywordId " +
            "join CompanyMeasure as CM " +
            "on KM.extractedKeyword.extractKeywordId = CM.extractedKeyword.extractKeywordId " +
            "join Company as C " +
            "on CM.company.companyId = C.companyId " +
            "where I.inputId = :inputId")
    Optional<List<Company>>findAllByInputId(@Param("inputId") long inputId);
}