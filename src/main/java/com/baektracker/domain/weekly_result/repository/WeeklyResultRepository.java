package com.baektracker.domain.weekly_result.repository;

import com.baektracker.domain.weekly_result.dto.UserFine;
import com.baektracker.domain.weekly_result.dto.response.MonthFineStatusResponse.InnerUserMonthFineItem;
import com.baektracker.domain.weekly_result.model.WeeklyResult;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WeeklyResultRepository extends JpaRepository<WeeklyResult, Long> {
    List<WeeklyResult> findWeeklyResultByYearWeek(String yearWeek);

    Optional<WeeklyResult> findWeeklyResultByYearWeekAndUser_Id(String yearWeek, Long userId);

    @Query("""
                select wr
                    from WeeklyResult wr
                        where month(wr.weekDt)=month(:weekDt) and wr.fine > 0
            """)
    List<WeeklyResult> findWeeklyResultByMonth(LocalDate weekDt);

    @Query("""
                select new com.baektracker.domain.weekly_result.dto.UserFine(
                           wr.user,
                             ifnull(sum(wr.fine), 0)
                            )
                    from WeeklyResult wr
                                group by wr.user
            """)
    List<UserFine> getTotalFineGroupByUser();

    @Query(value = """
                with month_weeks as (select id,
                                           fine,
                                           row_number() over (partition by id order by year_week) as rownum
                                    from weekly_results
                                    where year_week = #{yearWeek}
                                    order by rownum),
                    sum as (select id,
                                   IFNULL(sum(fine), 0)                    as amount,
                                   json_arrayagg(IF(fine > 0, rownum, -1)) as week_list
                            from month_weeks
                            group by id),
                    final as (SELECT u.id,
                                     u.nickname,
                                     s.amount,
                                     s.week_list
                              FROM users u
                                       left outer join sum s on s.id = u.id)
               select IFNULL(sum(amount), 0) as sum,
                      json_arrayagg(json_object(
                              'id', id,
                              'name', name,
                              'amount', amount,
                              'week_list', week_list
                                    ))       as user_list
               from final
               order by amount
            """, nativeQuery = true)
    List<InnerUserMonthFineItem> getUserMonthFineItems(LocalDate date);
}
