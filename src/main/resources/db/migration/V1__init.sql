create table if not exists tb_baekjoon_problem
(
    problem_id int           not null comment '백준 문제 아이디'
        primary key,
    title      varchar(64)   not null comment '백준 문제명',
    level      int default 0 not null comment '백준 문제 레벨',
    limited_tm int default 0 not null comment '제한 시간 (ms, 언어별 상이)'
)
    comment '백준 문제 정보';

create table if not exists tb_mark_problem
(
    user_id    varchar(20)           not null comment '유저 아이디',
    problem_id int                   not null comment '문제 아이디',
    submit_id  int                   not null comment '제출 아이디',
    result_id  int                   not null comment '결과 정보 (4: 맞음)',
    week_id    varchar(7) default '' not null,
    elapsed_tm int                   null comment '걸린 시간 (ms)',
    used_mem   int                   null comment '사용된 메모리 (KB)',
    lang       varchar(8)            null comment '사용한 언어',
    err_txt    varchar(20)           null comment '에러 메세지',
    try_dt     date                  null comment '시도 일자',
    primary key (user_id, problem_id, submit_id)
)
    comment '백준 문제 채점 정보';

create table if not exists tb_solved_user
(
    id             varchar(20)                    not null
        primary key,
    name           varchar(20)                    null,
    streak         int        default 0           not null comment '스트릭(연속 달성 주차)',
    pass_this_week tinyint(1) default 0           not null comment '이번주 패스권 ',
    last_read      int        default (-(1))      not null comment '마지막으로 읽은 제출 아이디 (top)',
    last_read_time datetime                       null,
    regi_dt        date       default (curdate()) not null comment '가입일자'
)
    comment '코테 스터디 유저';

create table if not exists tb_weekly_shared_problem
(
    week_id    varchar(7) not null,
    problem_id int        not null,
    primary key (week_id, problem_id)
)
    comment '주차별 공통 문제';

create table if not exists tb_weekly_solved
(
    week_id     varchar(7)           not null,
    id          varchar(20)          not null,
    score       int        default 0 null comment '달성한 점수',
    week_dt     date                 not null comment '주차 일자',
    complete_st tinyint(1) default 0 not null comment '완료 여부',
    fine        int        default 0 null comment '벌금',
    primary key (week_id, id)
)
    comment '주차별 해결 여부';

