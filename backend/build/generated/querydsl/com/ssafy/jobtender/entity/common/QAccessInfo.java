package com.ssafy.jobtender.entity.common;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAccessInfo is a Querydsl query type for AccessInfo
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QAccessInfo extends BeanPath<AccessInfo> {

    private static final long serialVersionUID = -1965625138L;

    public static final QAccessInfo accessInfo = new QAccessInfo("accessInfo");

    public final DateTimePath<java.util.Date> createDate = createDateTime("createDate", java.util.Date.class);

    public final NumberPath<Long> createId = createNumber("createId", Long.class);

    public final DateTimePath<java.util.Date> updateDate = createDateTime("updateDate", java.util.Date.class);

    public final NumberPath<Long> updateId = createNumber("updateId", Long.class);

    public QAccessInfo(String variable) {
        super(AccessInfo.class, forVariable(variable));
    }

    public QAccessInfo(Path<? extends AccessInfo> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAccessInfo(PathMetadata metadata) {
        super(AccessInfo.class, metadata);
    }

}

