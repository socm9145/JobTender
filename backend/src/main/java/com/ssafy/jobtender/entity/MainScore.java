package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Main_Scores")
public class MainScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long mainScoreId;
    @Column(nullable = false)
    private long mainScore;
    //mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "main_keyword_id")
    private MainKeyword mainKeyword;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;
}
