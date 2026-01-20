package com.campusconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.campusconnect.model.*;
import com.campusconnect.repository.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private AttendanceRepository attendanceRepo;

    @Autowired
    private ResultRepository resultRepo;

    @Autowired
    private NoticeRepository noticeRepo;

    //Add Student
    @PostMapping("/student")
    public Student addStudent(@RequestBody Student student) {
        return studentRepo.save(student);
    }

    //Add Attendance
    @PostMapping("/attendance")
    public String addAttendance(@RequestBody Attendance attendance) {
        Student s = studentRepo
                .findByUserid(attendance.getStudent().getUserid())
                .orElse(null);

        if (s == null) return "Student not found";

        attendance.setStudent(s);
        attendanceRepo.save(attendance);
        return "Attendance added";
    }

    //Add Result
    @PostMapping("/result")
    public String addResult(@RequestBody Result result) {
        Student s = studentRepo
                .findByUserid(result.getStudent().getUserid())
                .orElse(null);

        if (s == null) return "Student not found";

        result.setStudent(s);
        resultRepo.save(result);
        return "Result added";
    }

    //Add Notice
    @PostMapping("/notice")
    public String addNotice(@RequestBody Notice notice) {
        noticeRepo.save(notice);
        return "Notice added";
    }
}
