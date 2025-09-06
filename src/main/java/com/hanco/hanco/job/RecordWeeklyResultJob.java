package com.hanco.hanco.job;

import com.hanco.hanco.service.ProblemService;
import com.hanco.hanco.service.WeeklyResultService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;

// 주차별 달성 기록 Job
@RequiredArgsConstructor
@Slf4j
@Component
public class RecordWeeklyResultJob implements Job {
	private final ProblemService problemService;
	private final WeeklyResultService weeklyResultService;

	@Override
	public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
		log.info("Coding Study Weekly Job is processing!");

		LocalDate today = LocalDate.now();
		if(today.getDayOfWeek() != DayOfWeek.SUNDAY){
			log.error("Weekly Job must have run at Sunday!");
			return;
		}
		problemService.loadBaekjoonProblemStatus();

		weeklyResultService.insertWeeklyScore(60, 3000);
	}
}
