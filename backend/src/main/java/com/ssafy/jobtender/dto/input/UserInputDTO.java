package com.ssafy.jobtender.dto.input;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInputDTO {
    long id;
    int age;
    String gender;
    String nickname;
}
