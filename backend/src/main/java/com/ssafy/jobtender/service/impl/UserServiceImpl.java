package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.UserDAO;
import com.ssafy.jobtender.dto.input.UpdateUserDTO;
import com.ssafy.jobtender.dto.output.UserOutDTO;
import com.ssafy.jobtender.entity.User;
import com.ssafy.jobtender.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

public class UserServiceImpl implements UserService {
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
    public UserOutDTO updateUsersByUserId(long userId, UpdateUserDTO updateUserDTO) {
        return null;
    }

    @Override
    public UserOutDTO deleteUserByUserId(long userId) {
        return null;
    }
}