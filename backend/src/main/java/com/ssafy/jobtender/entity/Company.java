package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "Companies")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long companyId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String type;
    @Column(nullable = false)
    private String scale;
    @Column(nullable = false)
    private String salary;
    @Column(nullable = false)
    private String employeesNumber;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private long yearFounded;
    // mapping
    @OneToOne(mappedBy = "company", orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id")
    private CompanyRating companyRating;
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CompanyScore> companyScores = new ArrayList<>();
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CompanyMeasure> companyMeasures = new ArrayList<>();
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<CompanyKeyword> companyKeywords = new ArrayList<>();
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SimilarCompany> similarCompanies = new ArrayList<>();
    @OneToMany(mappedBy = "comparableCompany", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SimilarCompany> comparable_similarCompanies = new ArrayList<>();

}
