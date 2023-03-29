package com.ssafy.jobtender.entity.common;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class AccessInfo {
    private long createId;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    private long updateId;
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;
}
