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
//    @Query("select distinct C\n" +
//            "from Input as I\n" +
//            "join KeywordMeasure as KM\n" +
//            "on I.keyword.keywordId = KM.keyword.keywordId\n" +
//            "join CompanyMeasure as CM\n" +
//            "on KM.extractedKeyword.extractKeywordId = CM.extractedKeyword.extractKeywordId\n" +
//            "join Company as C\n" +
//            "on CM.company.companyId = C.companyId\n" +
//            "where I.inputId = :inputId\n")
//    List<Company>findAllByInputId(@Param("inputId") long inputId);
}