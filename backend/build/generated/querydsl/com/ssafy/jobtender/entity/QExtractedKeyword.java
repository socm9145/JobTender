package com.ssafy.jobtender.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QExtractedKeyword is a Querydsl query type for ExtractedKeyword
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QExtractedKeyword extends EntityPathBase<ExtractedKeyword> {

    private static final long serialVersionUID = -1737177776L;

    public static final QExtractedKeyword extractedKeyword = new QExtractedKeyword("extractedKeyword");

    public final ListPath<CompanyMeasure, QCompanyMeasure> companyMeasures = this.<CompanyMeasure, QCompanyMeasure>createList("companyMeasures", CompanyMeasure.class, QCompanyMeasure.class, PathInits.DIRECT2);

    public final NumberPath<Long> extractKeywordId = createNumber("extractKeywordId", Long.class);

    public final ListPath<KeywordMeasure, QKeywordMeasure> keywordMeasures = this.<KeywordMeasure, QKeywordMeasure>createList("keywordMeasures", KeywordMeasure.class, QKeywordMeasure.class, PathInits.DIRECT2);

    public final StringPath name = createString("name");

    public final StringPath type = createString("type");

    public QExtractedKeyword(String variable) {
        super(ExtractedKeyword.class, forVariable(variable));
    }

    public QExtractedKeyword(Path<? extends ExtractedKeyword> path) {
        super(path.getType(), path.getMetadata());
    }

    public QExtractedKeyword(PathMetadata metadata) {
        super(ExtractedKeyword.class, metadata);
    }

}

