package com.example.job_application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.job_application.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

}