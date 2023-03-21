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
    long keywordId;
    @Column(nullable = false)
    long extractedKeywordId;
    @Column(nullable = false)
    String score;
}
