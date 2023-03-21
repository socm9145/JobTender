package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "keyword_measures")
public class KeywordMeasure {
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
    @JoinColumn(name = "keyword_id")
    Keyword keyword;

}
