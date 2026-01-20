package com.campusconnect.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.campusconnect.model.Attendance;
import com.campusconnect.repository.AttendanceRepository;

@RestController
@RequestMapping("/api/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private AttendanceRepository attendanceRepo;

    @GetMapping("/attendance/{userid}")
    public List<Attendance> getAttendance(@PathVariable String userid) {
        return attendanceRepo.findByStudent_Userid(userid);
    }
}