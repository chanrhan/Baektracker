package com.baektracker;

import org.quartz.SchedulerException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BaektrackerApplication {

    public static void main(String[] args) throws SchedulerException {
        SpringApplication.run(BaektrackerApplication.class, args);
    }

}
