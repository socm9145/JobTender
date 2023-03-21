package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "company_measures")
public class CompanyMeasure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long companyMeasureId;
    @Column(nullable = false)
    long companyId;
    @Column(nullable = false)
    long extractedKeywordId;
    @Column(nullable = false)
    String score;
}
