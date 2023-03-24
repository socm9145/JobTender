package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.KeywordMeasure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface KeywordMeasureRepo extends JpaRepository<KeywordMeasure, Long> {
    @Query("select k " +
            "from KeywordMeasure k " +
            "where k.keyword.keywordId = :keywordId")
    Optional<List<KeywordMeasure>> findAllByKeyword(@Param("keywordId") long keywordId);
}
