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
    public Map<String, Object> login(@RequestBody Map<String, String> req) {

        System.out.println("=== LOGIN API HIT ===");
        System.out.println("RAW REQUEST MAP = " + req);

        String userid = req.get("userid");
        String password = req.get("password");

        if (userid != null) userid = userid.trim();
        if (password != null) password = password.trim();

        System.out.println("FROM REQUEST -> userid = [" + userid + "]");
        System.out.println("FROM REQUEST -> password = [" + password + "]");

        Map<String, Object> res = new HashMap<>();

        Student s = studentRepo.findByUserid(userid).orElse(null);

        if (s != null) {
            System.out.println("FROM DB -> userid = [" + s.getUserid() + "]");
            System.out.println("FROM DB -> password = [" + s.getPassword() + "]");
        } else {
            System.out.println("NO USER FOUND FOR userid = " + userid);
        }

        if (s != null && s.getPassword().trim().equals(password)) {
            res.put("success", true);
        } else {
            res.put("success", false);
        }

        return res;
    }
}
