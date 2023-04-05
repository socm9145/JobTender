package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.SimilarCompany;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SimilarCompanyRepoTest {
    @Autowired
    private SimilarCompanyRepo similarCompanyRepo;
    @Test
    void findAllByCompanyId() {
        /* given */
        final long selectedCompanyId = 1;
        final long[] expected = {2, 3};
        int index = 0;

        /* when */
        final Optional<List<SimilarCompany>> isSimilarCompany = similarCompanyRepo.findAllByCompanyId(selectedCompanyId);
        List<SimilarCompany> similarCompanies = isSimilarCompany.get();

        /* then */
        if(isSimilarCompany.isEmpty()){
            assertNull(similarCompanies);
        }else{
            for(SimilarCompany similarCompany: similarCompanies){
                assertEquals(expected[index++], similarCompany.getComparableCompany().getCompanyId());
            }
        }
    }
}
