package com.ssafy.jobtender.dao;

import com.ssafy.jobtender.dto.output.Chart2OutDTO;
import com.ssafy.jobtender.dto.output.CompanyRatingOutDTO;
import com.ssafy.jobtender.dto.output.KeywordRandomCompanyOutDto;
import com.ssafy.jobtender.entity.Company;
import org.springframework.stereotype.Component;

import java.util.List;


public interface CompanyDAO {
    CompanyRatingOutDTO readCompanies(long companyId);
    List<KeywordRandomCompanyOutDto> readKeywordCompaniesByResultId(long resultId);
    Chart2OutDTO readC2ByCompanyId(long companyId);
}