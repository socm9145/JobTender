package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Company_Ratings")
public class CompanyRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long companyRatingId;
    @Column(nullable = false)
    private String averageRating;
    @Column(nullable = false)
    private String growthRating;
    @Column(nullable = false)
    private String balanceRating;
    @Column(nullable = false)
    private String salaryWelfareRating;
    @Column(nullable = false)
    private String cultureRating;
    @Column(nullable = false)
    private String managementRating;
    // mapping
    @OneToOne(mappedBy = "companyRating", orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id")
    private Company company;
}
