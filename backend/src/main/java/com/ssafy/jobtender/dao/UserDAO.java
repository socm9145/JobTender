package com.ssafy.jobtender.dao;

import java.util.Optional;

public interface UserDAO {
    public Optional<Boolean> existsByUserId();
}