alter table weekly_problems
    change week_id year_week varchar(7);

alter table weekly_results
    change week_id year_week varchar(7);