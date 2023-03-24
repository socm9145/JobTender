package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeywordRepo extends JpaRepository<Keyword, Long> {

    @Query("SELECT k from Keyword k")
    List<Keyword> findAllKeywords();
}