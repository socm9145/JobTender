package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionRepo extends JpaRepository<Option, Long> {
}