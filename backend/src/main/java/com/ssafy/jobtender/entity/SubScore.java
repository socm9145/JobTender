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
    private long keywordId;
    @Column(nullable = false)
    private long subKeywordId;
    @Column(nullable = false)
    private long subScore;
}
