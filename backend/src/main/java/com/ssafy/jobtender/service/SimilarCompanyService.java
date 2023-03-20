package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.output.ComparableCompanyNameOutputDTO;

import java.util.List;

public interface SimilarCompanyService {
    List<ComparableCompanyNameOutputDTO> readComparableCompanies(long selected_company_id);
}