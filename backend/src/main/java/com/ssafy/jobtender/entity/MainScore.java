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
    private long keywordId;
    @Column(nullable = false)
    private long mainKeywordId;
    @Column(nullable = false)
    private long mainScore;
}
