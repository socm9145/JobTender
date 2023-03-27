package com.ssafy.jobtender.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "keyword_measures")
public class KeywordMeasure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long keywordMeasureId;
    @Column(nullable = false)
    String score;
    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "extracted_keyword_id")
    @JsonIgnore
    ExtractedKeyword extractedKeyword;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword_id")
    @JsonIgnoreProperties({"keyword"})
    Keyword keyword;

}
