package com.ssafy.jobtender.dao.impl;

import com.ssafy.jobtender.dao.UserDAO;
import com.ssafy.jobtender.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class UserDAOImpl implements UserDAO {
//    private UserRepo userRepo;
//
//    @Autowired
//    public UserDAOImpl(UserDAOImpl userRepo){
//        this.userRepo = userRepo;
//    }
    @Override
    public Optional<Boolean> existsByUserId() {
        return null;
    }
}