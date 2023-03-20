package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.dao.UserDAO;
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
        return null;
    }

    @Override
    public UserOutDTO updateUsersByUserId(long userId) {
        return null;
    }

    @Override
    public UserOutDTO deleteUserByUserId(long userId) {
        return null;
    }
}