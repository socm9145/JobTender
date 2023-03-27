package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Similar_Companies")
public class SimilarCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long similarCompanyId;
    private String comparableScore;
    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comparable_company_id")
    private Company comparableCompany;
}
