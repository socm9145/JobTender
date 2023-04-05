package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "keyword_research")
public class KeywordResearch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long keywordResearchId;
    @Column(nullable = false)
    private String gender;
    @Column(nullable = false)
    private float average;
    @Column(nullable = false)
    private float std;
    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;
}
