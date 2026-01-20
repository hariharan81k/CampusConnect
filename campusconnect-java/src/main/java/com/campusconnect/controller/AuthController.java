package com.campusconnect.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.campusconnect.model.Student;
import com.campusconnect.repository.StudentRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Student req) {

        Map<String, Object> res = new HashMap<>();

        Student student = studentRepo.findByUserid(req.getUserid()).orElse(null);

        if (student != null && encoder.matches(req.getPassword(), student.getPassword())) {
            res.put("success", true);
            res.put("userid", student.getUserid());
            res.put("name", student.getName());
        } else {
            res.put("success", false);
        }

        return res;
    }
}

