package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Company_Scores")
public class CompanyScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long companyResultId;
    @Column(nullable = false)
    private String score;
    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;
    @ManyToOne(fetch = FetchType.LAZY)
    private Result result;
}
