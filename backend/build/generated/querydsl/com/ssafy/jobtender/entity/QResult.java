package com.ssafy.jobtender.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QResult is a Querydsl query type for Result
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QResult extends EntityPathBase<Result> {

    private static final long serialVersionUID = -1463687868L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QResult result = new QResult("result");

    public final com.ssafy.jobtender.entity.common.QAccessInfo accessInfo;

    public final ListPath<CompanyScore, QCompanyScore> companyScores = this.<CompanyScore, QCompanyScore>createList("companyScores", CompanyScore.class, QCompanyScore.class, PathInits.DIRECT2);

    public final ListPath<Input, QInput> inputs = this.<Input, QInput>createList("inputs", Input.class, QInput.class, PathInits.DIRECT2);

    public final NumberPath<Long> resultId = createNumber("resultId", Long.class);

    public final QUser user;

    public QResult(String variable) {
        this(Result.class, forVariable(variable), INITS);
    }

    public QResult(Path<? extends Result> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QResult(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QResult(PathMetadata metadata, PathInits inits) {
        this(Result.class, metadata, inits);
    }

    public QResult(Class<? extends Result> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.accessInfo = inits.isInitialized("accessInfo") ? new com.ssafy.jobtender.entity.common.QAccessInfo(forProperty("accessInfo")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

