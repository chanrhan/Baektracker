package com.baektracker.global.job;

import com.baektracker.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class RecordUserLevelJob implements Job {
    private final UserService userService;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        userService.updateUserInfoFromSolvedAc();
    }
}
