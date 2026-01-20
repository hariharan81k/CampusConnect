package com.campusconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.campusconnect.model.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {
}
