package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.SimilarCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
public interface SimilarCompanyRepo extends JpaRepository<SimilarCompany, Long> {
    @Query("SELECT s FROM SimilarCompany s WHERE s.company.companyId = :companyId")

    Optional<List<SimilarCompany>> findAllByCompanyId(@Param("companyId") long companyId);
}