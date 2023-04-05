package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.dto.input.UpdateUserDTO;
import com.ssafy.jobtender.dto.output.UserOutDTO;
import com.ssafy.jobtender.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public interface UserDAO {
    UserOutDTO readUsersByUserId(long userId);
    UserOutDTO updateUsersByUserId(UpdateUserDTO updateUserDTO);
    Boolean deleteUserByUserId(long userId);
    List<UserOutDTO> keywordRankingByGender(String gender);
    List<UserOutDTO> keywordRankingByAge(int age);
    User insertUser(User user);
    User readUserByOauthId(long oauthId);
    void updateRefreshToken(long userId, String jwtRefreshToken);
    String readRefreshTokenByUserId(long userid);
    void deleteRefreshTokenByUserId(long userId);
}