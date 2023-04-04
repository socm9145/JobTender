package com.ssafy.jobtender.dto.output;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Chart2OutDTO {
    long companyId;
    String companyName;
    List<Chart2ChildOutDTO> chart2ChildOutDTOs;
}
