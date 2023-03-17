package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.MainKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainKeywordRepo extends JpaRepository<MainKeyword, Long> {
}