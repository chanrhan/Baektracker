set @start_date := (select date_sub(curdate(), interval weekday(curdate()) day));

with recursive base as (select @start_date as dt,
                               0           as cnt,
                               0           as state
                        union all
                        select date_sub(dt, interval 1 week)  as dt,
                               IF(ws.state = 1, cnt + 1, cnt) as cnt,
                               ws.state                       as state
                        from base
                                 left outer join weekly_results ws
                                                 on ws.year_week =
                                                    date_format(date_sub(dt, interval 1 week), '%Y-%u') and
                                                    ws.user_id = 7
                        where ws.state = 1
                           or ws.state = 3)
select *
from base
