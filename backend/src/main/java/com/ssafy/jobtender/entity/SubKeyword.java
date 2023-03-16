package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Sub_Keywords")
public class SubKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long subKeywordId;
    @Column(nullable = false)
    private long companyId;
    @Column(nullable = false)
    private String keyword;
    private String tfIdfScore;
}
