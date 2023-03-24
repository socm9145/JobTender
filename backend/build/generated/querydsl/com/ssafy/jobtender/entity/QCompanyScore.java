package com.ssafy.jobtender.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCompanyScore is a Querydsl query type for CompanyScore
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCompanyScore extends EntityPathBase<CompanyScore> {

    private static final long serialVersionUID = 835304444L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCompanyScore companyScore = new QCompanyScore("companyScore");

    public final QCompany company;

    public final NumberPath<Long> companyResultId = createNumber("companyResultId", Long.class);

    public final StringPath CompanyScoreRank = createString("CompanyScoreRank");

    public final QResult result;

    public final StringPath score = createString("score");

    public QCompanyScore(String variable) {
        this(CompanyScore.class, forVariable(variable), INITS);
    }

    public QCompanyScore(Path<? extends CompanyScore> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCompanyScore(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCompanyScore(PathMetadata metadata, PathInits inits) {
        this(CompanyScore.class, metadata, inits);
    }

    public QCompanyScore(Class<? extends CompanyScore> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.company = inits.isInitialized("company") ? new QCompany(forProperty("company"), inits.get("company")) : null;
        this.result = inits.isInitialized("result") ? new QResult(forProperty("result"), inits.get("result")) : null;
    }

}

