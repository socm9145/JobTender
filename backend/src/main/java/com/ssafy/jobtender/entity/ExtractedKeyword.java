package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "extract_keywords")
public class ExtractedKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long extractKeywordId;
    @Column(nullable = false)
    String name;
    @Column(nullable = false)
    String type;
}
