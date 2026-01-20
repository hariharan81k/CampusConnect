package com.campusconnect.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.campusconnect.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    Optional<Student> findByUserid(String userid);
}
