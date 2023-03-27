package com.ssafy.jobtender.dto.output;

import com.ssafy.jobtender.entity.common.AccessInfo;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
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

    @Builder(builderMethodName = "createBuilder")
    public UserOutDTO(long userId, String name, String email,
                      int age, String gender, String provider,
                      AccessInfo accessInfo, String accessToken,
                      String refreshToken){
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.age = age;
        this.gender = gender;
        this.provider = provider;
        this.accessInfo = accessInfo;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
