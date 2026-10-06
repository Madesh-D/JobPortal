package com.example.job_application.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.job_application.dto.ApplicationResponse;
import com.example.job_application.entity.JobApplication;
import com.example.job_application.service.JobApplicationService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private final JobApplicationService jobApplicationService;

    public ApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    // Apply for a job
    @PostMapping
    public JobApplication applyForJob(
            @RequestBody JobApplication application) {

        return jobApplicationService.applyForJob(application);
    }

    // Get applications of a user with job details
    @GetMapping("/user/{userId}")
    public List<ApplicationResponse> getApplicationsByUser(
            @PathVariable Long userId) {

        return jobApplicationService.getApplicationsByUser(userId);
    }

    // Get all applications
    @GetMapping
    public List<JobApplication> getAllApplications() {

        return jobApplicationService.getAllApplications();
    }

    // Update application status
    @PutMapping("/{id}/status")
    public JobApplication updateStatus(
            @PathVariable Long id,
            @RequestBody String status) {

        return jobApplicationService.updateStatus(id, status);
    }
}