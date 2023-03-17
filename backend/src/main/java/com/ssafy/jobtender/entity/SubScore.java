package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Sub_Scores")
public class SubScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long subScoreId;
    @Column(nullable = false)
    private long subScore;
    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_keyword_id")
    private SubKeyword subKeyword;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;
}
