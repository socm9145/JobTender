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
    String score;
    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "extracted_keyword_id")
    ExtractedKeyword extractedKeyword;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    Company company;
}
