set @date := CURDATE();
set @max_date := (select date_sub(@date, interval 1 week));

truncate weekly_results;

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
                                                        on try_dt between dt and date_add(dt, interval 6 day) and
                                                           sp.result_id = 4
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

      select date_format(dt, '%Y-%u') as year_week,
             dt,
             user_id,
             score,
             IF(score >= 60, 1, 2)    as state,
             IF(score < 60, 3000, 0)  as fine
      from score_by_date) t;

insert into weekly_results
    (year_week, week_dt, user_id, score, state, fine)
select date_format(@date, '%Y-%u'),
       date_sub(@date, interval weekday(@date) day),
       id,
       0,
       0,
       0
from users;

set @start_date := (select date_sub(@date, interval weekday(@date) day));

update users u
set streak=(with recursive base as (select @start_date as dt,
                                           0           as cnt,
                                           0           as state
                                    union all
                                    select date_sub(dt, interval 1 week)        as dt,
                                           IF(ws.state in (1, 3), cnt + 1, cnt) as cnt,
                                           ws.state                             as state
                                    from base
                                             left join weekly_results ws
                                                       on ws.year_week =
                                                          date_format(date_sub(dt, interval 1 week), '%Y-%u') and
                                                          ws.user_id = u.id
                                    where ws.state in (1, 3))
            select max(cnt)
            from base)
