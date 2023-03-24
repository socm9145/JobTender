package com.ssafy.jobtender.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCompanyMeasure is a Querydsl query type for CompanyMeasure
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCompanyMeasure extends EntityPathBase<CompanyMeasure> {

    private static final long serialVersionUID = -1416990648L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCompanyMeasure companyMeasure = new QCompanyMeasure("companyMeasure");

    public final QCompany company;

    public final NumberPath<Long> companyMeasureId = createNumber("companyMeasureId", Long.class);

    public final QExtractedKeyword extractedKeyword;

    public final StringPath score = createString("score");

    public QCompanyMeasure(String variable) {
        this(CompanyMeasure.class, forVariable(variable), INITS);
    }

    public QCompanyMeasure(Path<? extends CompanyMeasure> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCompanyMeasure(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCompanyMeasure(PathMetadata metadata, PathInits inits) {
        this(CompanyMeasure.class, metadata, inits);
    }

    public QCompanyMeasure(Class<? extends CompanyMeasure> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.company = inits.isInitialized("company") ? new QCompany(forProperty("company"), inits.get("company")) : null;
        this.extractedKeyword = inits.isInitialized("extractedKeyword") ? new QExtractedKeyword(forProperty("extractedKeyword")) : null;
    }

}

