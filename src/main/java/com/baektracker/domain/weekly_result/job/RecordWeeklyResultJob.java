package com.baektracker.domain.weekly_result.job;

import com.baektracker.domain.baekjoon.service.BaekjoonService;
import com.baektracker.domain.weekly_result.service.WeeklyResultService;
import java.time.DayOfWeek;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

// 주차별 달성 기록 Job
@RequiredArgsConstructor
@Slf4j
@Component
public class RecordWeeklyResultJob implements Job {
    private final BaekjoonService baekjoonService;
    private final WeeklyResultService weeklyResultService;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        log.info("[Job] Weekly Job is processing!");

        LocalDate thisWeekDate = LocalDate.now();
        LocalDate fromDate = thisWeekDate.minusDays(6);
        if (thisWeekDate.getDayOfWeek() != DayOfWeek.SUNDAY) {
            log.error("Weekly Job must have run at Sunday!");
            return;
        }
        LocalDate nextWeekDate = thisWeekDate.plusDays(1);

        // 백준 문제 불러오기
        baekjoonService.loadBaekjoonProblemStatus();

        // 주간 결과 정산 및 새로운 (빈) 주간 결과 삽입
        weeklyResultService.updateWeeklyResults(fromDate, thisWeekDate);
        weeklyResultService.insertInitialWeeklyResults(nextWeekDate);

        // 각 사용자별 스트릭 갱신
        weeklyResultService.updateUserStreaks(fromDate);
    }
}
