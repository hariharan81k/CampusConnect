package com.campusconnect.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.campusconnect.model.Result;

public interface ResultRepository extends JpaRepository<Result, Integer> {
    List<Result> findByStudent_Userid(String userid);
}
