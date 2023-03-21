package com.ssafy.jobtender.entity;

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
    List<KeywordMeasure> keywordMeasures = new ArrayList<>();
}
