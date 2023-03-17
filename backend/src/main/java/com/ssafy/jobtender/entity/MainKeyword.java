package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "Main_Keywords")
public class MainKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long mainKeywordId;
    @Column(nullable = false)
    private String mainKeyword;
    private String tfIdfScore;
    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;
    @OneToMany(mappedBy = "keyword", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MainScore> mainScores = new ArrayList<>();
}
