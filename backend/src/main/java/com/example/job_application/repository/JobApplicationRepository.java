package com.example.job_application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.job_application.entity.JobApplication;

public interface JobApplicationRepository
        extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByUserId(Long userId);

    boolean existsByUserIdAndJobId(Long userId, Long jobId);
}