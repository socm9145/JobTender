package com.ssafy.jobtender.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainKeywordRepo extends JpaRepository<MainKeyword, Long> {
}