package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dao.UserDAO;
import com.ssafy.jobtender.dto.input.UpdateUserDTO;
import com.ssafy.jobtender.dto.output.UserOutDTO;
import com.ssafy.jobtender.entity.User;
import com.ssafy.jobtender.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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
}