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
    @Column(nullable = false)
    private long companyId;
    @Column(nullable = false)
    private long comparableCompanyId;
    private String comparableScore;
}
