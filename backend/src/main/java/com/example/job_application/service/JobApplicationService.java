package com.example.job_application.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.job_application.dto.ApplicationResponse;
import com.example.job_application.entity.Job;
import com.example.job_application.entity.JobApplication;
import com.example.job_application.exception.ResourceNotFoundException;
import com.example.job_application.repository.JobApplicationRepository;
import com.example.job_application.repository.JobRepository;
import com.example.job_application.repository.UserRepository;

@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public JobApplicationService(
            JobApplicationRepository jobApplicationRepository,
            UserRepository userRepository,
            JobRepository jobRepository) {

        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    // Apply for a job
    public JobApplication applyForJob(JobApplication application) {

        if (!userRepository.existsById(application.getUserId())) {
            throw new ResourceNotFoundException(
                    "User not found with id: " + application.getUserId());
        }

        if (!jobRepository.existsById(application.getJobId())) {
            throw new ResourceNotFoundException(
                    "Job not found with id: " + application.getJobId());
        }

        if (jobApplicationRepository.existsByUserIdAndJobId(
                application.getUserId(),
                application.getJobId())) {

            throw new IllegalArgumentException(
                    "You have already applied for this job");
        }

        application.setAppliedDate(LocalDateTime.now());
        application.setStatus("Applied");

        return jobApplicationRepository.save(application);
    }

    // Get applications of a user with job details
    public List<ApplicationResponse> getApplicationsByUser(Long userId) {

        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException(
                    "User not found with id: " + userId);
        }

        List<JobApplication> applications =
                jobApplicationRepository.findByUserId(userId);

        return applications.stream()
                .map(application -> {

                    Job job = jobRepository.findById(application.getJobId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Job not found with id: "
                                                    + application.getJobId()));

                    return new ApplicationResponse(
                            application.getId(),
                            application.getUserId(),
                            application.getJobId(),
                            job.getTitle(),
                            job.getCompany(),
                            job.getLocation(),
                            job.getSkills(),
                            job.getSalary(),
                            application.getAppliedDate(),
                            application.getStatus()
                    );
                })
                .toList();
    }

    // Get all applications
    public List<JobApplication> getAllApplications() {
        return jobApplicationRepository.findAll();
    }

    // Update application status
    public JobApplication updateStatus(Long id, String status) {

        JobApplication application =
                jobApplicationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Application not found with id: " + id));

        application.setStatus(status);

        return jobApplicationRepository.save(application);
    }
}