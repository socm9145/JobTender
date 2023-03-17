package com.ssafy.jobtender.entity;

import com.ssafy.jobtender.entity.common.AccessInfo;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "Results")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long resultId;
    @Embedded
    AccessInfo accessInfo;

    // mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "result", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Input> inputs = new ArrayList<>();
    @OneToMany(mappedBy = "result", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CompanyScore> companyScores = new ArrayList<>();
}
