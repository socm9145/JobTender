package com.ssafy.jobtender.entity;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "survey_results")
public class SurveyResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long surveyResultId;
    @Column(nullable = false)
    String score;
    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    Result result;
    @ManyToOne(fetch = FetchType.LAZY)
    Survey survey;
}
