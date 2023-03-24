package com.ssafy.jobtender.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "extracted_keywords")
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
    @JsonIgnore
    List<KeywordMeasure> keywordMeasures = new ArrayList<>();
    @OneToMany(mappedBy = "extractedKeyword", orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonIgnore
    List<CompanyMeasure> companyMeasures = new ArrayList<>();

}
