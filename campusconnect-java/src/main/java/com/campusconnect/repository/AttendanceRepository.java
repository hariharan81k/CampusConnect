package com.campusconnect.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.campusconnect.model.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

    List<Attendance> findByStudent_Userid(String userid);
}
