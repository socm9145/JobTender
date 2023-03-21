package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepo extends JpaRepository<Company, Long> {
    Optional<Company> findByCompanyId(long company_id);
}