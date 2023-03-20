package com.ssafy.jobtender.service.impl;

import com.ssafy.jobtender.dto.output.ComparableCompanyNameOutputDTO;
import com.ssafy.jobtender.service.SimilarCompanyService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SimilarCompanyServiceImpl implements SimilarCompanyService {

    @Override
    public List<ComparableCompanyNameOutputDTO> readComparableCompanies(long selected_company_id) {

        return null;
    }
}