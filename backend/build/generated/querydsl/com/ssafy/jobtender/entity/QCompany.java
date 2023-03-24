package com.ssafy.jobtender.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCompany is a Querydsl query type for Company
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCompany extends EntityPathBase<Company> {

    private static final long serialVersionUID = 1723253814L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCompany company = new QCompany("company");

    public final StringPath address = createString("address");

    public final NumberPath<Long> companyId = createNumber("companyId", Long.class);

    public final ListPath<CompanyMeasure, QCompanyMeasure> companyMeasures = this.<CompanyMeasure, QCompanyMeasure>createList("companyMeasures", CompanyMeasure.class, QCompanyMeasure.class, PathInits.DIRECT2);

    public final QCompanyRating companyRating;

    public final ListPath<CompanyScore, QCompanyScore> companyScores = this.<CompanyScore, QCompanyScore>createList("companyScores", CompanyScore.class, QCompanyScore.class, PathInits.DIRECT2);

    public final ListPath<SimilarCompany, QSimilarCompany> comparable_similarCompanies = this.<SimilarCompany, QSimilarCompany>createList("comparable_similarCompanies", SimilarCompany.class, QSimilarCompany.class, PathInits.DIRECT2);

    public final StringPath employeesNumber = createString("employeesNumber");

    public final StringPath name = createString("name");

    public final StringPath salary = createString("salary");

    public final StringPath scale = createString("scale");

    public final ListPath<SimilarCompany, QSimilarCompany> similarCompanies = this.<SimilarCompany, QSimilarCompany>createList("similarCompanies", SimilarCompany.class, QSimilarCompany.class, PathInits.DIRECT2);

    public final StringPath type = createString("type");

    public final NumberPath<Long> yearFounded = createNumber("yearFounded", Long.class);

    public QCompany(String variable) {
        this(Company.class, forVariable(variable), INITS);
    }

    public QCompany(Path<? extends Company> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCompany(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCompany(PathMetadata metadata, PathInits inits) {
        this(Company.class, metadata, inits);
    }

    public QCompany(Class<? extends Company> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.companyRating = inits.isInitialized("companyRating") ? new QCompanyRating(forProperty("companyRating"), inits.get("companyRating")) : null;
    }

}

