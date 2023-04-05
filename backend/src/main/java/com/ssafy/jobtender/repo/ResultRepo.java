package com.ssafy.jobtender.repo;

import com.ssafy.jobtender.dto.output.UserOutDTO;
import com.ssafy.jobtender.entity.Result;
import com.ssafy.jobtender.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResultRepo extends JpaRepository<Result, Long> {   // <main, pk>
    /*
    @Query("SELECT s FROM SimilarCompany s WHERE s.company.companyId = :companyId")
    Optional<List<SimilarCompany>> findAllByCompanyId(@Param("companyId") long companyId);
    */

//    @Query(nativeQuery = true,
//            value = "select R.result_id, R.user_id, C.company_id, C.score from results R join company_scores C on R.result_id = C.result_id")

    //List<ReadResultOutDTO> readResultsByUserId();

    // accessToken으로 사용자 정보 찾는 repo
//    User findByUserId(long userId);
    @Query("select r from Result r where r.user.userId = :userId order by r.accessInfo.createDate DESC")
    Optional<List<Result>> findByUserId(@Param("userId") Long userId);  // 리스트로 반환 index 0

}