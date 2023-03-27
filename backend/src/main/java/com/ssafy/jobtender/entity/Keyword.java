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
public class Keyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long keywordId;
    @Column(nullable = false)
    private String keyword;
    // mapping
    @OneToMany(mappedBy = "keyword", orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"keyword"})
    private List<KeywordMeasure> keywordMeasures = new ArrayList<>();

    @OneToMany(mappedBy = "keyword", orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"keyword"})
    private List<Input> inputs = new ArrayList<>();
}
