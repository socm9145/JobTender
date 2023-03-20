package com.ssafy.jobtender.dto.input;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class KeywordInputDTO {
    List<String> keyWords;
}
