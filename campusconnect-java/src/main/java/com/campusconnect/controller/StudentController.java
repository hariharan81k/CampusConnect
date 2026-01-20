package com.campusconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campusconnect.model.Attendance;
import com.campusconnect.model.Result;
import com.campusconnect.model.Notice;
import com.campusconnect.repository.AttendanceRepository;
import com.campusconnect.repository.ResultRepository;
import com.campusconnect.repository.NoticeRepository;

@RestController
@RequestMapping("/api/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private AttendanceRepository attendanceRepo;

    @Autowired
    private ResultRepository resultRepo;

    @Autowired
    private NoticeRepository noticeRepo;

    @GetMapping("/attendance/{userid}")
    public List<Attendance> getAttendance(@PathVariable String userid) {
        return attendanceRepo.findByStudent_Userid(userid);
    }

    @GetMapping("/results/{userid}")
    public List<Result> getResults(@PathVariable String userid) {
        return resultRepo.findByStudent_Userid(userid);
    }

    @GetMapping("/notices")
    public List<Notice> getNotices() {
        return noticeRepo.findAll();
    }
}
