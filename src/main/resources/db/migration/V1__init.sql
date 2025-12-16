create table if not exists problems
(
    id         int         not null comment '백준 문제 아이디'
        primary key,
    title      varchar(64) not null comment '백준 문제명',
    level      int                  default 0 not null comment '백준 문제 레벨',
    limit_time int                  default 0 not null comment '제한 시간 (ms, 언어별 상이)',
    created_at datetime    not null default current_timestamp,
    updated_at datetime    not null default current_timestamp
)
    comment '백준 문제 정보';

create table if not exists solved_problems
(
    id           bigint unsigned auto_increment primary key,
    user_id      bigint      not null comment '유저 아이디',
    problem_id   int         not null comment '문제 아이디',
    submit_id    int         not null comment '제출 아이디',
    result_id    int         not null comment '결과 정보 (4: 맞음)',
    elapsed_time int         null comment '걸린 시간 (ms)',
    used_memory  int         null comment '사용된 메모리 (KB)',
    language     varchar(8)  null comment '사용한 언어',
    err_txt      varchar(20) null comment '에러 메세지',
    try_dt       date        null comment '시도 일자',
    created_at   datetime    not null default current_timestamp,
    updated_at   datetime    not null default current_timestamp
)
    comment '해결한 문제 정보';

create table if not exists users
(
    id             bigint unsigned auto_increment primary key,
    username       varchar(20)  not null,
    password       varchar(256) not null,
    nickname       varchar(20)  null,
    last_read      int                   default (-(1)) not null comment '마지막으로 읽은 제출 아이디 (top)',
    last_read_time datetime     null,
    created_at     datetime     not null default current_timestamp,
    updated_at     datetime     not null default current_timestamp
)
    comment '유저';

create table if not exists weekly_problems
(
    id         bigint unsigned auto_increment primary key,
    week_id    varchar(7) not null,
    problem_id int        not null,
    created_at datetime   not null default current_timestamp,
    updated_at datetime   not null default current_timestamp
)
    comment '주차별 문제';

create table if not exists weekly_results
(
    id         bigint unsigned auto_increment primary key,
    week_id    varchar(7)    not null,
    user_id    varchar(20)   not null,
    score      int default 0 null comment '달성한 점수',
    state      int default 0 not null comment '완료 여부',
    fine       int default 0 null comment '벌금',
    created_at datetime      not null default current_timestamp,
    updated_at datetime      not null default current_timestamp
)
    comment '주간 결과';

