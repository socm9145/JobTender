package com.ssafy.jobtender.dto.output;

import com.ssafy.jobtender.entity.common.AccessInfo;

import javax.persistence.Column;
import javax.persistence.Embedded;

public class UserOutDTO {
    private long userId;
    private String name;
    private String email;
    private int age;
    private String gender;
    private String provider;
    private AccessInfo accessInfo;
    private String accessToken;
    private String refreshToken;
}
