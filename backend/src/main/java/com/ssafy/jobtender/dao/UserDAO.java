package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.dto.output.UserOutDTO;
import com.ssafy.jobtender.entity.User;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public interface UserDAO {
    UserOutDTO readUsersByUserId(long userId);
    UserOutDTO updateUsersByUserId(long userId);
    UserOutDTO deleteUserByUserId(long userId);
}