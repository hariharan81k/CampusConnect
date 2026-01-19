package com.campusconnect.model;

import jakarta.persistence.*;
import com.campusconnect.model.Student;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String subject;
    private int percentage;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    // getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public int getPercentage() { return percentage; }
    public void setPercentage(int percentage) { this.percentage = percentage; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }
}
