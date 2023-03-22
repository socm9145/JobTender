package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUserId(long userId);
    Optional<List<User>> findAllByGender(String gender);
    Optional<List<User>> findAllByAge(int age);
    List<User> findByOauthId(String oauthId);
}