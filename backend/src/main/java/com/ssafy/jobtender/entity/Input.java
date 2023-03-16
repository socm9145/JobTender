package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Inputs")
public class Input {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long resultId;
    @Column(nullable = false)
    private long userId;
    @Column(nullable = false)
    private String keyword;
}
