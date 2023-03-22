package com.ssafy.jobtender.oauth;

import com.ssafy.jobtender.entity.User;

import javax.lang.model.type.IntersectionType;
import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;

public enum OAuthAttributes {
    KAKAO("kakao", (attributes)->{
        return new UserProfile(
                (String) attributes.get("gender"),
                Integer.parseInt((String)(attributes.get("age_range")))
        );
    });

    private final String registrationId;
    private final Function<Map<String, Object>, UserProfile> of;

    OAuthAttributes(String registrationId, Function<Map<String, Object>, UserProfile> of){
        this.registrationId = registrationId;
        this.of = of;
    }

    public static UserProfile extract(String registrationId, Map<String, Object> attributes){
        return Arrays.stream(values())
                .filter(provider -> registrationId.equals(provider.registrationId))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new)
                .of.apply(attributes);
    }
}
