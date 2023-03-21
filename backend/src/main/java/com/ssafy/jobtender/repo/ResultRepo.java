package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepo extends JpaRepository<Result, Long> {
    /*
    @Query("SELECT s FROM SimilarCompany s WHERE s.company.companyId = :companyId")
    Optional<List<SimilarCompany>> findAllByCompanyId(@Param("companyId") long companyId);
    */

//    @Query(nativeQuery = true,
//            value = "select R.result_id, R.user_id, C.company_id, C.score from results R join company_scores C on R.result_id = C.result_id")

    //List<ReadResultOutDTO> readResultsByUserId();
}