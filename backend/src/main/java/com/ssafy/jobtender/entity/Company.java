package com.ssafy.jobtender.entity;

import lombok.Data;

import javax.persistence.*;

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
}
