package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.CompanyRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRatingRepo extends JpaRepository<CompanyRating, Long> {

}