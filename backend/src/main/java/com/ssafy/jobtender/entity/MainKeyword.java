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
    @ManyToOne()
    private List<Company> companies = new ArrayList<>();
}
