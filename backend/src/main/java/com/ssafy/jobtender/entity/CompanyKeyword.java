package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Company_Keywords")
public class CompanyKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long companyKeywordId;
    @Column(nullable = false)
    String name;
    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    Company company;

}
