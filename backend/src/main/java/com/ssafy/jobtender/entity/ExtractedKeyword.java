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
@JsonIgnoreProperties({"keywordMeasures", "companyMeasures"})
public class ExtractedKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long extractKeywordId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String type;
    // mapping
    @OneToMany(mappedBy = "extractedKeyword", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<KeywordMeasure> keywordMeasures = new ArrayList<>();
    @OneToMany(mappedBy = "extractedKeyword", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<CompanyMeasure> companyMeasures = new ArrayList<>();

}
