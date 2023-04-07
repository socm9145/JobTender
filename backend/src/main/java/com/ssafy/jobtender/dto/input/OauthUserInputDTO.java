package com.ssafy.jobtender.dto.input;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OauthUserInputDTO {
    long oauthId;
    int age;
    String gender;
    String nickname;
}
