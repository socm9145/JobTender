package com.ssafy.jobtender.entity;

import com.ssafy.jobtender.entity.common.AccessInfo;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Results")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long resultId;
    @Column(nullable = false)
    private String userId;
    @Embedded
    AccessInfo accessInfo;
}
