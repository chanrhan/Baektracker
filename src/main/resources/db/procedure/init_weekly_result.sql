set @max_date := (select date_sub(curdate(), interval 2 week));

insert into weekly_results
    (year_week, week_dt, user_id, score, state, fine)
select *
from (with recursive
          dates as (select '2025-06-09' as dt
                    union all
                    select date_add(dt, interval 1 week) as dt
                    from dates
                    where dt < @max_date),
          user_date as (select dt,
                               id as user_id
                        from dates,
                             users),
          problems_by_date as (select distinct dt,
                                               ud.user_id,
                                               sp.problem_id
                               from user_date ud
                                        left outer join solved_problems sp
                                                        on date_format(sp.try_dt, '%Y-%u') =
                                                           date_format(dt, '%Y-%u') and sp.result_id = 4
                                                            and sp.user_id = ud.user_id),
          score_by_date as (select dt,
                                   user_id,
                                   IFNULL(sum(case
                                                  when level <= 0 then 10
                                                  when level > 0 and level <= 5 then 20
                                                  when level > 5 and level <= 10 then 30
                                                  when level > 10 and level <= 15 then 50
                                                  when level > 15 then 80
                                                  else 0
                                       end), 0) as score
                            from problems_by_date
                                     left outer join problems pb on pb.id = problem_id
                            group by dt, user_id)

      select dt,
             date_format(dt, '%Y-%u') as year_week,
             user_id,
             score,
             IF(score >= 60, 1, 2)    as state,
             IF(score < 60, 3000, 0)  as fine
      from score_by_date) t;

insert into weekly_results
    (year_week, week_dt, user_id, score, state, fine)
select date_sub(curdate(), interval weekday(curdate()) day),
       date_format(curdate(), '%Y-%u'),
       id,
       0,
       0,
       0
from users;