package com.ssafy.jobtender.service;

import com.ssafy.jobtender.dto.output.Chart2OutDTO;
import com.ssafy.jobtender.dto.output.CompanyRatingOutDTO;
import com.ssafy.jobtender.dto.output.KeywordRandomCompanyOutDto;

import java.util.List;
import java.util.Map;


public interface CompanyService {
    CompanyRatingOutDTO readCompanies(long companyId);
    Map<String, List<KeywordRandomCompanyOutDto>> readCompaniesByKeywords(long resultId);

    Chart2OutDTO readC2ByCompanyId(long companyId);
}