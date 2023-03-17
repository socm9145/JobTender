package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.Input;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InputRepo extends JpaRepository<Input, Long> {

}