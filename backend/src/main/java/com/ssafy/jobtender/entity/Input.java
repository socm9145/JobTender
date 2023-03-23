package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Inputs")
public class Input {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long InputId;
    @Column(nullable = false)
    private int keywordRank;
    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "result_id")
    private Result result;
}
