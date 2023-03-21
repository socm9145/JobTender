package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.dto.output.ComparableCompanyNameOutputDTO;

import java.util.List;

public interface SimilarCompanyDAO {
    List<ComparableCompanyNameOutputDTO> readComparableCompanies(long selectedCompanyId);
}