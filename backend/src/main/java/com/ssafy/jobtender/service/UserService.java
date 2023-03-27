package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.input.UpdateUserDTO;
import com.ssafy.jobtender.dto.output.UserOutDTO;
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

}