# 해당 쿼리를 실행하려는 날짜 기준, 이전 주까지의 스트릭을 갱신
# 이번 주의 주간 결과는 포함 안함
set @start_date := (select date_sub(curdate(), interval weekday(curdate()) day));

update users u
set streak=(with recursive base as (select @start_date as dt,
                                           0           as cnt,
                                           0           as state
                                    union all
                                    select date_sub(dt, interval 1 week) as dt,
                                           cnt + (ws.state = 1)          as cnt,
                                           ws.state                      as state
                                    from base
                                             left join weekly_results ws
                                                       on ws.year_week =
                                                          date_format(date_sub(dt, interval 1 week), '%Y-%u') and
                                                          ws.user_id = u.id
                                    where ws.state in (1, 3))
            select max(cnt)
            from base)
