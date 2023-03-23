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
    @Column(nullable = false)
    private long createId;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createDate;
    @Column(nullable = false)
    private long updateId;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date updateDate;
}
