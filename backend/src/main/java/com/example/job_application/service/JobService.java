package com.example.job_application.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.job_application.entity.Job;
import com.example.job_application.exception.ResourceNotFoundException;
import com.example.job_application.repository.JobRepository;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // Add job
    public Job addJob(Job job) {
        return jobRepository.save(job);
    }

    // Get all jobs
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Get job by ID
    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Job not found with id: " + id));
    }

    // Update job
    public Job updateJob(Long id, Job updatedJob) {

        Job existingJob = jobRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Job not found with id: " + id));

        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setCompany(updatedJob.getCompany());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setSkills(updatedJob.getSkills());
        existingJob.setSalary(updatedJob.getSalary());

        return jobRepository.save(existingJob);
    }

    // Delete job
    public void deleteJob(Long id) {

        if (!jobRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Job not found with id: " + id);
        }

        jobRepository.deleteById(id);
    }
}