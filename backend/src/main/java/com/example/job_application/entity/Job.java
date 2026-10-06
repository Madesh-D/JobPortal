package com.example.job_application.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String company;
    private String location;
    private String skills;
    private Double salary;

    private String jobType;
    private String experience;
    private String description;

    public Job() {
    }

    // Old constructor
    public Job(
            Long id,
            String title,
            String company,
            String location,
            String skills,
            Double salary) {

        this.id = id;
        this.title = title;
        this.company = company;
        this.location = location;
        this.skills = skills;
        this.salary = salary;
    }

    // New constructor
    public Job(
            Long id,
            String title,
            String company,
            String location,
            String skills,
            Double salary,
            String jobType,
            String experience,
            String description) {

        this.id = id;
        this.title = title;
        this.company = company;
        this.location = location;
        this.skills = skills;
        this.salary = salary;
        this.jobType = jobType;
        this.experience = experience;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}