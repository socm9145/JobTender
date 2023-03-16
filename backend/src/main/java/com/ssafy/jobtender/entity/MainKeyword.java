package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Main_Keywords")
public class MainKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long mainKeywordId;
    @Column(nullable = false)
    private long companyId;
    @Column(nullable = false)
    private String mainKeyword;
    private String tfIdfScore;
}
