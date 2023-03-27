package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Company_Scores")
public class CompanyScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long companyScoreId;
    @Column(nullable = false)
    private String score;
    @Column(nullable = false)
    private String CompanyScoreRank;
    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "result_id")
    private Result result;
}
