package com.ssafy.jobtender.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSimilarCompany is a Querydsl query type for SimilarCompany
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSimilarCompany extends EntityPathBase<SimilarCompany> {

    private static final long serialVersionUID = 1095996985L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSimilarCompany similarCompany = new QSimilarCompany("similarCompany");

    public final QCompany company;

    public final QCompany comparableCompany;

    public final StringPath comparableScore = createString("comparableScore");

    public final NumberPath<Long> similarCompanyId = createNumber("similarCompanyId", Long.class);

    public QSimilarCompany(String variable) {
        this(SimilarCompany.class, forVariable(variable), INITS);
    }

    public QSimilarCompany(Path<? extends SimilarCompany> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSimilarCompany(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSimilarCompany(PathMetadata metadata, PathInits inits) {
        this(SimilarCompany.class, metadata, inits);
    }

    public QSimilarCompany(Class<? extends SimilarCompany> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.company = inits.isInitialized("company") ? new QCompany(forProperty("company"), inits.get("company")) : null;
        this.comparableCompany = inits.isInitialized("comparableCompany") ? new QCompany(forProperty("comparableCompany"), inits.get("comparableCompany")) : null;
    }

}

