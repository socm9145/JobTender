package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.dto.output.CompanyRatingOutDTO;
import org.springframework.stereotype.Component;


public interface CompanyDAO {
    CompanyRatingOutDTO readCompanies(long companyId);
}