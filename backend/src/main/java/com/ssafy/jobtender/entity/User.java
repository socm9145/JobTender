package com.ssafy.jobtender.entity;

import com.ssafy.jobtender.entity.common.AccessInfo;
import lombok.Data;
import lombok.Generated;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private int age;
    @Column(nullable = false)
    private String gender;
    @Column(nullable = false)
    private String provider;
    @Embedded
    AccessInfo accessInfo;
    private String accessToken;
    private String refreshToken;

}
