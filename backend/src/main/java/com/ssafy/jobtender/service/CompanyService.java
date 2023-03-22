package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.output.CompanyRatingOutDTO;
import org.springframework.stereotype.Service;


public interface CompanyService {
    CompanyRatingOutDTO readCompanies(long companyId);
}