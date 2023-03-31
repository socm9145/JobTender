package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "company_measures")
public class CompanyMeasure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long companyMeasureId;
    @Column(nullable = false)
    private String score;
    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "extracted_keyword_id")
    private ExtractedKeyword extractedKeyword;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;
}
