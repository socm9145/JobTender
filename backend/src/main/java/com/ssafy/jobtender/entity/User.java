package com.ssafy.jobtender.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.jobtender.entity.common.AccessInfo;
import com.ssafy.jobtender.oauth.Role;
import lombok.Data;
import lombok.Generated;
import org.hibernate.action.internal.OrphanRemovalAction;

import javax.persistence.*;
import java.util.*;

@Data
@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    private String oauthId;
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
    private AccessInfo accessInfo;
    private String accessToken;
    private String refreshToken;
    @Enumerated(EnumType.STRING)
    private Role role;
    // mapping
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"user"})
    private List<Result> results = new ArrayList<>();
    // method
    public User update(String gender, int age){
        this.gender = gender;
        this.age = age;
        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
