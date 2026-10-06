package com.example.job_application.dto;

import java.time.LocalDateTime;

public class ApplicationResponse {

    private Long id;
    private Long userId;
    private Long jobId;

    private String title;
    private String company;
    private String location;
    private String skills;
    private Double salary;

    private LocalDateTime appliedDate;
    private String status;

    public ApplicationResponse() {
    }

    public ApplicationResponse(
            Long id,
            Long userId,
            Long jobId,
            String title,
            String company,
            String location,
            String skills,
            Double salary,
            LocalDateTime appliedDate,
            String status) {

        this.id = id;
        this.userId = userId;
        this.jobId = jobId;
        this.title = title;
        this.company = company;
        this.location = location;
        this.skills = skills;
        this.salary = salary;
        this.appliedDate = appliedDate;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public LocalDateTime getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDateTime appliedDate) {
        this.appliedDate = appliedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}