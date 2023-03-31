package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepo extends JpaRepository<Survey, Long> {
}
