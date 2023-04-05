package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.UserDAO;
import com.ssafy.jobtender.dto.input.OauthUserInputDTO;
import com.ssafy.jobtender.dto.input.UpdateUserDTO;
import com.ssafy.jobtender.dto.output.UserOutDTO;
import com.ssafy.jobtender.entity.User;
import com.ssafy.jobtender.entity.common.AccessInfo;
import com.ssafy.jobtender.jwt.JwtTokenProvider;
import com.ssafy.jobtender.oauth.OauthSecretKey;
import com.ssafy.jobtender.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    private final UserDAO userDAO;
    @Autowired
    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }
    @Override
    public UserOutDTO readUsersByUserId(long userId) {
        return userDAO.readUsersByUserId(userId);
    }

    @Override
    public UserOutDTO updateUsersByUserId(UpdateUserDTO updateUserDTO) {
        return userDAO.updateUsersByUserId(updateUserDTO);
    }

    @Override
    public Boolean deleteUserByUserId(long userId) {
        return userDAO.deleteUserByUserId(userId);
    }

    @Override
    public List<UserOutDTO> keywordRankingByGender(String gender) {
        return userDAO.keywordRankingByGender(gender);
    }

    @Override
    public List<UserOutDTO> keywordRankingByAge(int age) {
        return userDAO.keywordRankingByAge(age);
    }

    /**
     * 회원 가입
     * */
    @Override
    public User insertUser(OauthUserInputDTO oauthUserInputDTO) {
        User user = new User();
        user.setName(oauthUserInputDTO.getNickname());
        user.setAge(oauthUserInputDTO.getAge());
        user.setGender(oauthUserInputDTO.getGender());
        user.setOauthId(oauthUserInputDTO.getOauthId());
        user.setAccessInfo(new AccessInfo(-1L, new Date(),-1L,  new Date()));
        user.setProvider("kakao");
        return userDAO.insertUser(user);
    }

    @Override
    public User readUserByOauthId(long oauthId) {
        return userDAO.readUserByOauthId(oauthId);
    }

    /**
     * 리프레시 토큰 유효성 검사 및 DB 무결성 확인
     * */
    @Override
    public Long isValidRefreshToken(String refreshToken) {
        final int VALID_CODE = jwtTokenProvider.validateToken(refreshToken);
        if(VALID_CODE == jwtTokenProvider.IS_VALID){ // 유효한 리프레시 토큰인 경우 DB의 토큰과 비교
            long userId = Long.parseLong(jwtTokenProvider.getClaimsFromToken(refreshToken).getSubject());
            String refreshTokenInDB = userDAO.readRefreshTokenByUserId(userId);
            //토큰이 비어있을 경우 false
            if(refreshTokenInDB == null){
                return null;
            }
            //토큰이 서로 같은 경우 true
            if(refreshToken.equals(refreshTokenInDB)){
                return userId;
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    /**
     * 클라이언트에서 받은 인증 코드를 카카오서버에 요청한 뒤 액세스 토큰(등등) 응답 받음
     * */
    @Override
    public ResponseEntity<String> requestKakaoWithCode(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", OauthSecretKey.KAKAO_API_CLIENT_ID); //key 따로 빼야합니다
        params.add("redirect_uri", "http://localhost:3000/kakao");
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        String url = "https://kauth.kakao.com/oauth/token";

        RestTemplate restTemplate = new RestTemplateBuilder().build();
        return restTemplate.postForEntity(url, request, String.class);
    }

    /**
     * 응답 받은 카카오 서버용 액세스토큰 요청한 뒤 유저 정보를 응답 받음
     * */
    @Override
    public ResponseEntity<String> requestKakaoWithAccessToken(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        String url = "https://kapi.kakao.com/v2/user/me";

        RestTemplate restTemplate = new RestTemplateBuilder().build();
        return restTemplate.postForEntity(url, request, String.class);
    }

    /**
     * 리프레시 토큰 발급
     * */
    @Override
    public void updateRefreshToken(long userId, String jwtRefreshToken) {
        userDAO.updateRefreshToken(userId, jwtRefreshToken);
    }

    /**
     * 리프레시 토큰 삭제 (로그아웃 시)
     * */
    @Override
    public void deleteRefreshTokenByUserId(long userId) {
        userDAO.deleteRefreshTokenByUserId(userId);
    }
}