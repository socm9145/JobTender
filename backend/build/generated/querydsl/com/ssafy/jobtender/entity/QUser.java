package com.ssafy.jobtender.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -644995406L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final com.ssafy.jobtender.entity.common.QAccessInfo accessInfo;

    public final StringPath accessToken = createString("accessToken");

    public final NumberPath<Integer> age = createNumber("age", Integer.class);

    public final StringPath email = createString("email");

    public final StringPath gender = createString("gender");

    public final StringPath name = createString("name");

    public final StringPath oauthId = createString("oauthId");

    public final StringPath provider = createString("provider");

    public final StringPath refreshToken = createString("refreshToken");

    public final ListPath<Result, QResult> results = this.<Result, QResult>createList("results", Result.class, QResult.class, PathInits.DIRECT2);

    public final EnumPath<com.ssafy.jobtender.oauth.Role> role = createEnum("role", com.ssafy.jobtender.oauth.Role.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.accessInfo = inits.isInitialized("accessInfo") ? new com.ssafy.jobtender.entity.common.QAccessInfo(forProperty("accessInfo")) : null;
    }

}

