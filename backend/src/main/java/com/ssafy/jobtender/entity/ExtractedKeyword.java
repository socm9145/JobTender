package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "extract_keywords")
public class ExtractedKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long extractKeywordId;
    @Column(nullable = false)
    String name;
    @Column(nullable = false)
    String type;
    // mapping
    @OneToMany(mappedBy = "extractedKeyword", orphanRemoval = true, cascade = CascadeType.ALL)
    List<KeywordMeasure> keywordMeasures = new ArrayList<>();
    @OneToMany(mappedBy = "extractedKeyword", orphanRemoval = true, cascade = CascadeType.ALL)
    List<CompanyMeasure> companyMeasures = new ArrayList<>();

}
