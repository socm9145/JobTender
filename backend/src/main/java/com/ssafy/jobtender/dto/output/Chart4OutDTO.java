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

public class Chart4OutDTO {
    String name;
    List<Chart4ChildOutDTO> chart4ChildOutDTOs;
}
