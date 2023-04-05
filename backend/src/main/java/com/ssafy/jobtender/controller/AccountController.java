package com.ssafy.jobtender.controller;

import com.ssafy.jobtender.dto.input.OauthUserInputDTO;
import com.ssafy.jobtender.entity.User;
import com.ssafy.jobtender.jwt.JwtTokenProvider;
import com.ssafy.jobtender.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequestMapping(value = "/account", produces = "application/json; charset=utf-8")
public class AccountController {
    private final UserService userService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    public AccountController(UserService userService){
        this.userService = userService;
    }

    /**
     * 카카오 로그인 및 엑세스 토큰 쿠키로 발급
     * */
    @GetMapping("/auth/kakao/callback")
    public ResponseEntity<?> kakaoCallback(@RequestParam String code, HttpServletResponse httpServletResponse) {
        //인증 코드로 카카오 서버에 요청해서 토큰 받기
        ResponseEntity<String> response = userService.requestKakaoWithCode(code);

        //access_token 추출
        JSONObject jsonObject = new JSONObject(response.getBody());
        String accessToken = jsonObject.getString("access_token");

        //엑세스 토큰으로 카카오 서버에 요청해서 회원정보 받기
        response = userService.requestKakaoWithAccessToken(accessToken);

        //회원 정보 추출 (id, age_range, gender, nickname)
        jsonObject = new JSONObject(response.getBody());
        long oauthId = (long) jsonObject.get("id");//카카오 아이디

        //OauthId에 해당하는 회원 조회
        User user = userService.readUserByOauthId(oauthId);

        //신규 회원인 경우 회원 가입 후 조회
        if(user == null){
            JSONObject kakaoAccountJsonObject = jsonObject.getJSONObject("kakao_account");
            int age = 0;
            if(kakaoAccountJsonObject.has("age_range")){
                age = Integer.parseInt(kakaoAccountJsonObject.getString("age_range").split("~")[0]); //나이대
            }
            String gender = null;
            if(kakaoAccountJsonObject.has("gender")){
                gender = kakaoAccountJsonObject.getString("gender"); //성별
                if(gender.equals("male")){
                    gender = "M";
                }else{
                    gender = "F";
                }
            }

            JSONObject nicknameJsonObject = kakaoAccountJsonObject.getJSONObject("profile");
            String nickname = nicknameJsonObject.getString("nickname"); //닉네임

            OauthUserInputDTO oauthUserInputDTO = new OauthUserInputDTO(oauthId, age, gender, nickname);
            user = userService.insertUser(oauthUserInputDTO);
        }

        // 잡텐더 회원 아이디로 jwt 토큰 만들기
        final String jwtAccessToken = jwtTokenProvider.createAccessToken(String.valueOf(user.getUserId()));
        final String jwtRefreshToken = jwtTokenProvider.createRefreshToken(String.valueOf(user.getUserId()));

        // DB에 refreshtoken 넣기
        userService.updateRefreshToken(user.getUserId(), jwtRefreshToken);

        //Access Token 쿠키 생성
        ResponseCookie cookieForAccessToken = ResponseCookie.from("access_token", jwtAccessToken)
                .path("/")
                .maxAge((int)jwtTokenProvider.getACCESS_TOKEN_EXPIRATION_TIME())
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .build();

        //refresh Token 쿠키 생성
        ResponseCookie cookieForRefreshToken = ResponseCookie.from("refresh_token", jwtRefreshToken)
                .path("/")
                .maxAge((int)jwtTokenProvider.getREFRESH_TOKEN_EXPIRATION_TIME())
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .build();

        //쿠키 주입
        httpServletResponse.addHeader("Set-Cookie", cookieForAccessToken.toString());
        httpServletResponse.addHeader("Set-Cookie", cookieForRefreshToken.toString());

        return ResponseEntity.status(HttpStatus.OK).body(user.getUserId());
    }
    /**
     * 액세스 토큰과 리프레시 토큰 유효성 검사
     * */
    @GetMapping("/reissue")
    public ResponseEntity<?> reissue(@CookieValue(value = "access_token", required = false) Cookie cookieForAccessToken,
                                          @CookieValue(value = "refresh_token", required = false) Cookie cookieForRefreshToken,
                                          HttpServletResponse httpServletResponse){
        //Access Token 쿠키가 없는 경우
        if(cookieForAccessToken == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("쿠키가 존재하지 않습니다.");
        }
        //쿠키에서 액세스 토큰 값 추출
        final String accessToken = cookieForAccessToken.getValue();
        //토큰 유효성 검사
        final int VALIDATE_CODE = jwtTokenProvider.validateToken(accessToken);
        Long userId = null;
        if(VALIDATE_CODE == jwtTokenProvider.IS_VALID){ //액세스 토큰이 유효한 경우
            userId = Long.parseLong(jwtTokenProvider.getClaimsFromToken(accessToken).getSubject());
            return ResponseEntity.status(HttpStatus.OK).body(userId);
        }else if(VALIDATE_CODE == jwtTokenProvider.IS_EXPIRED){ //액세스 토큰이 만료된 경우
            //리프레시 토큰 값 추출
            final String refreshToken = cookieForRefreshToken.getValue();
            //리프레시 토큰 유효성 확인 (유효할 경우 userId return)
            userId = userService.isValidRefreshToken(refreshToken);
            //리프레시 토큰이 유효할 경우 재발급
            if(userId != null) {
                //Jwt 액세스 토큰 생성
                final String jwtAccessToken = jwtTokenProvider.createAccessToken(String.valueOf(userId));

                //액세스 토큰 쿠키 생성
                ResponseCookie newCookieForAccessToken = ResponseCookie.from("access_token", jwtAccessToken)
                        .path("/")
                        .maxAge((int)jwtTokenProvider.getACCESS_TOKEN_EXPIRATION_TIME())
                        .httpOnly(true)
                        .secure(true)
                        .sameSite("None")
                        .build();

                //쿠키 주입
                httpServletResponse.addHeader("Set-Cookie", cookieForAccessToken.toString());
                return ResponseEntity.status(HttpStatus.OK).body(userId);
            }else { //리프레시 토큰이 유효하지 않을 경우
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효한 토큰이 아닙니다.(R)");
            }
        }else{ //액세스 토큰이 유효하지 않은 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효한 토큰이 아닙니다.(A)");
        }
    }
    /**
     * 로그아웃 : 클라이언트에 있는 액세스 토큰, 리프레시 토큰 쿠키 삭제
     * */
    @GetMapping("/logout")
    public ResponseEntity<String> logout(@CookieValue(value = "access_token", required = false) Cookie cookieForAccessToken,
                                         @CookieValue(value = "refresh_token", required = false) Cookie cookieForRefreshToken,
                                         HttpServletResponse httpServletResponse){
        //Access Token 쿠키가 있을 경우 삭제
        if(cookieForAccessToken != null){
            cookieForAccessToken = new Cookie("access_token", null);
            cookieForAccessToken.setPath("/");
            cookieForAccessToken.setMaxAge(0);
            cookieForAccessToken.setHttpOnly(true);
            cookieForAccessToken.setSecure(true);
            //쿠키 주입
            httpServletResponse.addCookie(cookieForAccessToken);
        }
        //Refresh Token 쿠키가 있을 경우 삭제
        if(cookieForRefreshToken != null){
            cookieForRefreshToken = new Cookie("refresh_token", null);
            cookieForRefreshToken.setPath("/");
            cookieForRefreshToken.setMaxAge(0);
            cookieForRefreshToken.setHttpOnly(true);
            cookieForRefreshToken.setSecure(true);
            //쿠키 주입
            httpServletResponse.addCookie(cookieForRefreshToken);
        }
        return ResponseEntity.status(HttpStatus.OK).body("로그아웃 되었습니다.");
    }
}
