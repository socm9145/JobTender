package com.ssafy.jobtender.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QKeywordMeasure is a Querydsl query type for KeywordMeasure
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QKeywordMeasure extends EntityPathBase<KeywordMeasure> {

    private static final long serialVersionUID = -7578276L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QKeywordMeasure keywordMeasure = new QKeywordMeasure("keywordMeasure");

    public final NumberPath<Long> companyMeasureId = createNumber("companyMeasureId", Long.class);

    public final QExtractedKeyword extractedKeyword;

    public final QKeyword keyword;

    public final StringPath score = createString("score");

    public QKeywordMeasure(String variable) {
        this(KeywordMeasure.class, forVariable(variable), INITS);
    }

    public QKeywordMeasure(Path<? extends KeywordMeasure> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QKeywordMeasure(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QKeywordMeasure(PathMetadata metadata, PathInits inits) {
        this(KeywordMeasure.class, metadata, inits);
    }

    public QKeywordMeasure(Class<? extends KeywordMeasure> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.extractedKeyword = inits.isInitialized("extractedKeyword") ? new QExtractedKeyword(forProperty("extractedKeyword")) : null;
        this.keyword = inits.isInitialized("keyword") ? new QKeyword(forProperty("keyword")) : null;
    }

}

