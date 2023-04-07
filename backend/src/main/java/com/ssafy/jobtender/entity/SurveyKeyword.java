package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "survey_keywords")
public class SurveyKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long surveyKeywordId;
    @Column(nullable = false)
    private String score;
    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_score_id")
    private SurveyScore surveyScore;
}
