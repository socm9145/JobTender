package com.ssafy.jobtender.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.jobtender.entity.common.AccessInfo;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@ToString
@Table(name = "Results")
@JsonIgnoreProperties({"companyScores", "inputs", "surveyScores"})
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long resultId;
    @Embedded
    AccessInfo accessInfo;

    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "result", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Input> inputs = new ArrayList<>();
    @OneToMany(mappedBy = "result", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CompanyScore> companyScores = new ArrayList<>();
    @OneToMany(mappedBy = "result", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SurveyScore> surveyScores = new ArrayList<>();
}
