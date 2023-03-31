package com.ssafy.jobtender.oauth;

import com.ssafy.jobtender.entity.User;
import lombok.Data;

@Data
public class UserProfile {
    private long oauthId;
    private String gender;
    private int age;

    public UserProfile(String gender, int age) {
        this.gender = gender;
        this.age =age;
    }

    public User toMember() {
        System.out.println("toMember");
        return new User();
    }
}
