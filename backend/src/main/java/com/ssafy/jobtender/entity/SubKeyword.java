package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "Sub_Keywords")
public class SubKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long subKeywordId;
    @Column(nullable = false)
    private String keyword;
    private String tfIdfScore;
    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;
    @OneToMany(mappedBy = "subKeyword", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubScore> subScores = new ArrayList<>();
}
