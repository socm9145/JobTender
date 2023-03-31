package com.ssafy.jobtender.jwt;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Date;
@Slf4j
@Component
public class JwtTokenProvider {
    private final String SECRET_KEY = SecretKey.JWT_SECRET_KEY;
//    private final long ACCESS_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour
    private final long ACCESS_TOKEN_EXPIRATION_TIME = 1000 * 5; // 5 seconds for debug
    private final long REFRESH_TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7; // 1 week
//    private final long REFRESH_TOKEN_EXPIRATION_TIME = 1000 * 10; // 10 seconds for debug
    public final int IS_VALID = 0;
    public final int IS_INVALID_SIGNATURE = 1;
    public final int IS_MALFORMED = 2;
    public final int IS_EXPIRED = 3;
    public final int IS_UNSUPPORTED = 4;
    public final int IS_ILLEGAL_ARGUMENT = 5;
    public final int IS_UNKNOWN_EXCEPTION = 6;

    public long getACCESS_TOKEN_EXPIRATION_TIME(){
        return ACCESS_TOKEN_EXPIRATION_TIME;
    }

    public long getREFRESH_TOKEN_EXPIRATION_TIME(){
        return REFRESH_TOKEN_EXPIRATION_TIME;
    }

    public String createAccessToken(String subject) {
        return Jwts.builder()
                .setSubject(subject)
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public String createRefreshToken(String subject) {
        return Jwts.builder()
                .setSubject(subject)
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public Claims getClaimsFromToken(String token) throws ExpiredJwtException {
        // JSON Web Signature를 파싱 (JWT에 서명을 추가)
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    public int validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return IS_VALID;
        } catch (SignatureException e) {
            log.error("Invalid JWT signature");
            return IS_INVALID_SIGNATURE;
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token");
            return IS_MALFORMED;
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT token");
            return IS_EXPIRED;
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT token");
            return IS_UNSUPPORTED;
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty.");
            return IS_ILLEGAL_ARGUMENT;
        } catch (Exception e){
            log.error("Unknown Exception");
            return IS_UNKNOWN_EXCEPTION;
        }
    }
}
