package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.dto.output.KeywordRandomCompanyOutDto;
import com.ssafy.jobtender.entity.Input;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InputRepo extends JpaRepository<Input, Long> {
    @Query("SELECT I FROM Input I JOIN FETCH Keyword K ON I.keyword.keywordId = K.keywordId WHERE I.result.resultId = :resultId")
    Optional<List<Input>> findAllByResult(@Param("resultId") long resultId);
}