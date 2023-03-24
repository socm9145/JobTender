package com.ssafy.jobtender.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInput is a Querydsl query type for Input
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInput extends EntityPathBase<Input> {

    private static final long serialVersionUID = 1468758467L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QInput input = new QInput("input");

    public final NumberPath<Long> InputId = createNumber("InputId", Long.class);

    public final QKeyword keyword;

    public final NumberPath<Integer> keywordRank = createNumber("keywordRank", Integer.class);

    public final QResult result;

    public QInput(String variable) {
        this(Input.class, forVariable(variable), INITS);
    }

    public QInput(Path<? extends Input> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QInput(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QInput(PathMetadata metadata, PathInits inits) {
        this(Input.class, metadata, inits);
    }

    public QInput(Class<? extends Input> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.keyword = inits.isInitialized("keyword") ? new QKeyword(forProperty("keyword")) : null;
        this.result = inits.isInitialized("result") ? new QResult(forProperty("result"), inits.get("result")) : null;
    }

}

