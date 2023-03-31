package com.ssafy.jobtender.dao.impl;

import com.querydsl.core.types.Path;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAUpdateClause;
import com.ssafy.jobtender.dao.UserDAO;
import com.ssafy.jobtender.dto.input.UpdateUserDTO;
import com.ssafy.jobtender.dto.output.UserOutDTO;
import com.ssafy.jobtender.entity.QUser;
import com.ssafy.jobtender.entity.User;
import com.ssafy.jobtender.entity.common.AccessInfo;
import com.ssafy.jobtender.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class UserDAOImpl implements UserDAO {
    @PersistenceContext
    private EntityManager em;
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
    public UserOutDTO updateUsersByUserId(UpdateUserDTO updateUserDTO) {
        Optional<User> isUser = this.userRepo.findByUserId(updateUserDTO.getUserId());

        // if user is null
        if (isUser.isEmpty())
            return null;

        // update
        User user = isUser.get();
        AccessInfo accessInfo = new AccessInfo(user.getAccessInfo().getCreateId(),
                user.getAccessInfo().getCreateDate(),
                user.getAccessInfo().getUpdateId(),
                new Date());

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
                .accessInfo(accessInfo)
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

    @Override
    public List<UserOutDTO> keywordRankingByGender(String gender) {
        Optional<List<User>> AreUsers = this.userRepo.findAllByGender(gender);

        if (AreUsers.isEmpty())
            return null;

        List<UserOutDTO> userOutDTOs = new ArrayList<>();
        List<User> users = AreUsers.get();

        for (User user: users){
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

            userOutDTOs.add(userOutDTO);
        }
        return userOutDTOs;
    }

    @Override
    public List<UserOutDTO> keywordRankingByAge(int age) {
        Optional<List<User>> AreUsers = this.userRepo.findAllByAge(age);

        if (AreUsers.isEmpty())
            return null;

        List<UserOutDTO> userOutDTOs = new ArrayList<>();
        List<User> users = AreUsers.get();

        for (User user: users){
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

            userOutDTOs.add(userOutDTO);
        }
        return userOutDTOs;
    }

    @Override
    public User insertUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public User readUserByOauthId(long oauthId) {
        Optional<User> isUser = userRepo.findByOauthId(oauthId);
        if(isUser.isEmpty()){
            return null;
        }else{
            return isUser.get();
        }
    }

    @Override
    @Transactional
    public void updateRefreshToken(long userId, String jwtRefreshToken) {
        QUser user = QUser.user;
        JPAUpdateClause updateClause = new JPAUpdateClause(em, user);
        updateClause.set(user.refreshToken, jwtRefreshToken)
                .where(user.userId.eq(userId))
                .execute();
    }

    @Override
    public String readRefreshTokenByUserId(long userId) {
        QUser user = QUser.user;
        String refreshToken = new JPAQuery<>(em)
                .select(user.refreshToken)
                .from(user)
                .where(user.userId.eq(userId))
                .fetchOne();
        return refreshToken;
    }

    @Override
    @Transactional
    public void deleteRefreshTokenByUserId(long userId) {
        QUser user = QUser.user;
        JPAUpdateClause jpaUpdateClause = new JPAUpdateClause(em, user);
        jpaUpdateClause.set(user.refreshToken, (String) null)
                .where(user.userId.eq(userId))
                .execute();
    }
}