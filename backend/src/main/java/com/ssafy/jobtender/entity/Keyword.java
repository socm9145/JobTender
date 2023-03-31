package com.ssafy.jobtender.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "Keywords")
@JsonIgnoreProperties({"keywordMeasures", "inputs", "keywordResearches"})
public class Keyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long keywordId;
    @Column(nullable = false)
    private String keywordName;
    // mapping
    @OneToMany(mappedBy = "keyword", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<KeywordMeasure> keywordMeasures = new ArrayList<>();
    @OneToMany(mappedBy = "keyword", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Input> inputs = new ArrayList<>();
    @OneToMany(mappedBy = "keyword", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<KeywordResearch> keywordResearches = new ArrayList<>();
    @OneToMany(mappedBy = "keyword", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Survey> surveys = new ArrayList<>();
}
