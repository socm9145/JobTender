package com.ssafy.jobtender.dto.output;

import com.ssafy.jobtender.entity.common.AccessInfo;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResultOutputDTO {
    private long resultId;
    AccessInfo accessInfo;
}
