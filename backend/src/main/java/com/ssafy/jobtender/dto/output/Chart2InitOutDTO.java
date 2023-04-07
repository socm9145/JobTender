package com.ssafy.jobtender.dto.output;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Chart2InitOutDTO {
    long companyId;
    String companyName;
    String name;
    String value;
}
