package com.ssafy.jobtender.dto.output;

import lombok.Data;

@Data
public class ReadResultOutDTO {
    long resultId;
    long userId;
    String keyword;
    long companyId;
    String score;
    String name;
}
