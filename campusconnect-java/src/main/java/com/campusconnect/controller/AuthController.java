package com.campusconnect.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.campusconnect.model.Student;
import com.campusconnect.repository.StudentRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

    @Autowired
    private StudentRepository studentRepo;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Student req) {

        Map<String, Object> res = new HashMap<>();
        Student s = studentRepo.findByUserid(req.getUserid()).orElse(null);

        if (s != null && s.getPassword().equals(req.getPassword())) {
            res.put("success", true);
            res.put("userid", s.getUserid());
            res.put("name", s.getName());
        } else {
            res.put("success", false);
        }

        return res;
    }
}
