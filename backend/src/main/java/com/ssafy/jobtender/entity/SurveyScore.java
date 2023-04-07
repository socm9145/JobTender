package com.ssafy.jobtender.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "survey_scores")
@JsonIgnoreProperties({"surveyKeywords"})
public class SurveyScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long surveyScoreId;
    @Column(nullable = false)
    String score;
    @Column(nullable = false)
    private String surveyScoreRank;
    // mapping
    @OneToMany(mappedBy = "surveyScore", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SurveyKeyword> surveyKeywords = new ArrayList<>();
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "result_id")
    private Result result;

}
