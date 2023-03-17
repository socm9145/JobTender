package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.SubKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubKeywordRepo extends JpaRepository<SubKeyword, Long> {
}