package com.ssafy.jobtender.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCompanyRating is a Querydsl query type for CompanyRating
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCompanyRating extends EntityPathBase<CompanyRating> {

    private static final long serialVersionUID = 94298483L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCompanyRating companyRating = new QCompanyRating("companyRating");

    public final StringPath averageRating = createString("averageRating");

    public final StringPath balanceRating = createString("balanceRating");

    public final QCompany company;

    public final NumberPath<Long> companyRatingId = createNumber("companyRatingId", Long.class);

    public final StringPath cultureRating = createString("cultureRating");

    public final StringPath growthRating = createString("growthRating");

    public final StringPath managementRating = createString("managementRating");

    public final StringPath salaryWelfareRating = createString("salaryWelfareRating");

    public QCompanyRating(String variable) {
        this(CompanyRating.class, forVariable(variable), INITS);
    }

    public QCompanyRating(Path<? extends CompanyRating> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCompanyRating(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCompanyRating(PathMetadata metadata, PathInits inits) {
        this(CompanyRating.class, metadata, inits);
    }

    public QCompanyRating(Class<? extends CompanyRating> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.company = inits.isInitialized("company") ? new QCompany(forProperty("company"), inits.get("company")) : null;
    }

}

