package com.ssafy.jobtender.dto.output;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaticGenderOutDTO {
    float maleMean;
    float maleStd;
    float femaleMean;
    float femaleStd;
}
