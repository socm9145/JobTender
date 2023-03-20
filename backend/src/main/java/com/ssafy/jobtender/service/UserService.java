package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.input.UpdateUserDTO;
import com.ssafy.jobtender.dto.output.UserOutDTO;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public interface UserService {
    UserOutDTO readUsersByUserId(long userId);
    UserOutDTO updateUsersByUserId(long userId, UpdateUserDTO updateUserDTO);
    Boolean deleteUserByUserId(long userId);
}