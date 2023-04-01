package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.SurveyResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SurveyResultRepo extends JpaRepository<SurveyResult, Long> {

}
