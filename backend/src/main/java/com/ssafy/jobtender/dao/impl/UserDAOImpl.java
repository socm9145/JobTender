package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.dao.UserDAO;
import com.ssafy.jobtender.dto.input.UpdateUserDTO;
import com.ssafy.jobtender.dto.output.UserOutDTO;
import com.ssafy.jobtender.entity.User;
import com.ssafy.jobtender.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserDAOImpl implements UserDAO {
    private final UserRepo userRepo;
    @Autowired
    public UserDAOImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }
    @Override
    public UserOutDTO readUsersByUserId(long userId) {
        Optional<User> isUser = this.userRepo.findByUserId(userId);

        // if user is null
        if (isUser.isEmpty())
            return null;

        User user = isUser.get();
        UserOutDTO userOutDTO = UserOutDTO.createBuilder()
                .userId(user.getUserId())
                .name(user.getName())
                .age(user.getAge())
                .gender(user.getGender())
                .email(user.getEmail())
                .provider(user.getProvider())
                .accessToken(user.getAccessToken())
                .refreshToken(user.getRefreshToken())
                .accessInfo(user.getAccessInfo())
                .build();

        return userOutDTO;
    }
    @Override
    public UserOutDTO updateUsersByUserId(long userId, UpdateUserDTO updateUserDTO) {
        Optional<User> isUser = this.userRepo.findByUserId(userId);

        // if user is null
        if (isUser.isEmpty())
            return null;

        // update
        User user = isUser.get();
        this.userRepo.save(user);

        // return
        UserOutDTO userOutDTO = UserOutDTO.createBuilder()
                .userId(user.getUserId())
                .name(user.getName())
                .age(user.getAge())
                .gender(user.getGender())
                .email(user.getEmail())
                .provider(user.getProvider())
                .accessToken(user.getAccessToken())
                .refreshToken(user.getRefreshToken())
                .accessInfo(user.getAccessInfo())
                .build();

        return userOutDTO;
    }

    @Override
    public Boolean deleteUserByUserId(long userId) {
        Optional<User> isUser = this.userRepo.findByUserId(userId);

        // if user is null
        if (isUser.isEmpty())
            return false;

        User user = isUser.get();
        this.userRepo.delete(user);

        return true;
    }
}