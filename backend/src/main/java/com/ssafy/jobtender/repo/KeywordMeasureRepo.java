package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.KeywordMeasure;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface KeywordMeasureRepo extends JpaRepository<KeywordMeasure, Long> {

    Optional<List<KeywordMeasure>> findAllByKeyword(long keywordId);
}
