package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.input.OauthUserInputDTO;
import com.ssafy.jobtender.dto.input.UpdateUserDTO;
import com.ssafy.jobtender.dto.output.UserOutDTO;
import com.ssafy.jobtender.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public interface UserService {
    UserOutDTO readUsersByUserId(long userId);
    UserOutDTO updateUsersByUserId(UpdateUserDTO updateUserDTO);
    Boolean deleteUserByUserId(long userId);
    List<UserOutDTO> keywordRankingByGender(String gender);
    List<UserOutDTO> keywordRankingByAge(int age);
    User insertUser(OauthUserInputDTO oauthUserInputDTO);
    User readUserByOauthId(long oauthId);
    Long isValidRefreshToken(String refreshToken);
    ResponseEntity<String> requestKakaoWithCode(String code);
    ResponseEntity<String> requestKakaoWithAccessToken(String accessToken);
    void updateRefreshToken(long userId, String jwtRefreshToken);
    void deleteRefreshTokenByUserId(long userId);
}