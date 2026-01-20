package com.campusconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campusconnect.model.Attendance;
import com.campusconnect.model.Result;
import com.campusconnect.model.Notice;
import com.campusconnect.model.Student;
import com.campusconnect.repository.AttendanceRepository;
import com.campusconnect.repository.ResultRepository;
import com.campusconnect.repository.NoticeRepository;
import com.campusconnect.repository.StudentRepository;

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

    @PostMapping("/attendance")
    public String addAttendance(@RequestBody Attendance a) {
        Student s = studentRepo.findByUserid(a.getStudent().getUserid()).orElse(null);
        if (s == null) return "Student not found";
        a.setStudent(s);
        attendanceRepo.save(a);
        return "Attendance added";
    }

    @PostMapping("/results")
    public String addResult(@RequestBody Result r) {
        Student s = studentRepo.findByUserid(r.getStudent().getUserid()).orElse(null);
        if (s == null) return "Student not found";
        r.setStudent(s);
        resultRepo.save(r);
        return "Result added";
    }

    @PostMapping("/notice")
    public String addNotice(@RequestBody Notice n) {
        noticeRepo.save(n);
        return "Notice added";
    }
}
