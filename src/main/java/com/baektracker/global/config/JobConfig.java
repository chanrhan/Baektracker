package com.baektracker.global.config;

import com.baektracker.domain.weekly_result.job.RecordWeeklyResultJob;
import jakarta.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.quartz.CronScheduleBuilder;
import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class JobConfig {
    private final Scheduler scheduler;

    @PostConstruct // '의존성 주입이 완료 된 후 실행되는 메소드'를 지정하는 어노테이션
    public void run() {
        JobDetail codingStudyWeeklyJob = getJobDetail(RecordWeeklyResultJob.class, new HashMap());

        try {
            scheduler.scheduleJob(codingStudyWeeklyJob, getCronTrigger("0 59 23 ? * SUN")); // 매주 일요일 23:59
        } catch (SchedulerException e) {
            throw new RuntimeException(e);
        }
    }

    // Cron Expression
    // 초 | 분 | 시 | 일 | 월 | 요일 | 연도(생략가능)
    // * : 모든 값을 뜻합니다.
    // ? : 특정한 값이 없음을 뜻합니다. (일 또는 요일 중 하나를 비워둘 때 사용, 연도에도 사용 가능)
    // - : 범위를 뜻합니다. (예) 월요일에서 수요일까지는 MON-WED로 표현
    // , : 특별한 값일 때만 동작(예) 월,수,금 MON,WED,FRI
    // / : 시작시간 / 단위 (예)0분부터 매 5분0/5
    // L : 일에서 사용하면 마지막 일, 요일에서는 마지막 요일(토요일)
    // W : 가장 가까운 평일 (예) 15W는 15일에서 가장 가까운 평일 (월 ~ 금)을 찾음
    // # : 몇째주의 무슨 요일을 표현 (예) 3#2 : 2번째주 수요일
    public Trigger getCronTrigger(String scheduleExp) {
        return TriggerBuilder.newTrigger()
                .withSchedule(CronScheduleBuilder.cronSchedule(scheduleExp))
                .startNow().build();
    }

    public JobDetail getJobDetail(Class job, Map params) {
        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.putAll(params);
        return JobBuilder.newJob(job).usingJobData(jobDataMap).build();
    }
}
