package com.ssafy.jobtender.controller;

import com.ssafy.jobtender.entity.User;
import com.ssafy.jobtender.entity.common.AccessInfo;
import com.ssafy.jobtender.jwt.JwtTokenProvider;
import com.ssafy.jobtender.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Date;

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
    @GetMapping("/auth/kakao/callback")
    public ResponseEntity<String> kakaoCallback(@RequestParam String code) {
        //인증 코드로 요청해서 토큰 받기
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "1d00d14f1ffe2865a5b8a876c3de14da");
        params.add("redirect_uri", "http://localhost:3000/kakao");
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        String url = "https://kauth.kakao.com/oauth/token";

        RestTemplate restTemplate = new RestTemplateBuilder().build();
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        JSONObject jsonObject = new JSONObject(response.getBody());
        String accessToken = jsonObject.getString("access_token");

        //엑세스 토큰으로 요청해서 회원정보 받기
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        params = new LinkedMultiValueMap<>();
        request = new HttpEntity<>(params, headers);

        url = "https://kapi.kakao.com/v2/user/me";

        response = restTemplate.postForEntity(url, request, String.class);
        jsonObject = new JSONObject(response.getBody());

        //회원 정보 파싱
        long oauthId = (long) jsonObject.get("id");

        JSONObject kakaoAccountJsonObject = jsonObject.getJSONObject("kakao_account");
        int age = Integer.parseInt(kakaoAccountJsonObject.getString("age_range").split("~")[0]);
        String gender = kakaoAccountJsonObject.getString("gender");
        JSONObject nicknameJsonObject = kakaoAccountJsonObject.getJSONObject("profile");
        String nickname = nicknameJsonObject.getString("nickname");

        System.out.println(oauthId);
        System.out.println(age);
        System.out.println(gender);
        System.out.println(nickname);

        User user = userService.readUserByOauthId(oauthId);
        if(user == null){ // 회원 정보가 없으면 회원 가입
            user = new User();
            user.setName(nickname);
            user.setAge(age);
            user.setGender(gender);
            user.setOauthId(oauthId);
            user.setAccessInfo(new AccessInfo(-1L, new Date(),-1L,  new Date()));
            user.setProvider("kakao");
            user = userService.insertUser(user);
        }

        // jwt 토큰 만들기
        String jwtAccessToken = jwtTokenProvider.createAccessToken(String.valueOf(user.getUserId()));
        String jwtRefreshToken = jwtTokenProvider.createRefreshToken(String.valueOf(user.getUserId()));

        return ResponseEntity.status(HttpStatus.OK).body(jwtAccessToken);
    }
}
