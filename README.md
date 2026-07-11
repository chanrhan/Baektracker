# Baektracker

> 백준(BOJ) 문제 풀이 현황과 스터디 벌금을 실시간으로 조회하는 웹 서비스

스터디 그룹원들이 로그인 없이 자신의 백준 풀이 현황을 확인하고, 주차별 목표 점수 미달 시 누적되는 벌금 현황까지 한눈에 볼 수 있는 서비스입니다.

🔗 **Demo**: [momomanager.com:20000](https://momomanager.com:20000/)

---

## 주요 기능

- **풀이 현황 조회** — 각 사용자가 백준에서 해결한 문제를 실시간으로 조회. 문제 티어(Bronze~Ruby), 정답/오답 여부, 소요 시간·메모리·사용 언어까지 표시
- **주차별 문제 관리** — 매주 스터디에서 풀어야 할 문제 세트를 등록/수정하고, 문제 난이도 기반으로 점수를 산정
- **벌금 정산** — 매주 목표 점수(`DEADLINE_SCORE = 60`) 미달 시 벌금(`FINE_AMOUNT = 3000`원)이 자동 부과. 월별/누적 벌금 현황을 사용자별로 조회
- **주간 패스(Week Pass)** — 비밀번호 인증 후 특정 주차를 면제 처리 (주말 신청은 제한)
- **스트릭 & 티어 트래킹** — 사용자별 연속 달성 스트릭과 solved.ac 티어 변화를 매일 기록

---

## 기술 스택

**Backend**
- Java 17, Spring Boot 3.2.1
- Spring Security, Spring Data JPA + **QueryDSL 5.0** (타입 세이프 동적 쿼리)
- **MyBatis** (복잡한 통계/집계 쿼리)
- **Quartz** 스케줄러 (배치 잡)
- **Flyway** (DB 마이그레이션 버전 관리)
- **Jsoup** (백준 채점 현황 크롤링)
- MySQL

**Frontend**
- React 18, Redux Toolkit
- React Router v7, Axios, date-fns
- CSS Modules, Pretendard 폰트

**Infra / Build**
- Gradle (React 빌드 결과물을 Spring 정적 리소스로 번들링)
- Docker, docker-compose
- GitHub Actions (CI)

---

## 아키텍처

### 데이터 수집 방식
백준(acmicpc.net)은 공식 API를 제공하지 않으므로 두 개의 소스를 조합해 데이터를 수집합니다.

1. **백준 채점 현황 크롤링** — `Jsoup`으로 `/status` 페이지를 파싱해 사용자별 제출 내역을 수집. 각 사용자의 `last_read`(마지막으로 읽은 제출 ID)를 기준으로 커서 페이지네이션을 수행하여, 이미 수집한 제출은 다시 긁지 않도록 증분(incremental) 처리
2. **solved.ac API v3** — `RestClient`로 문제의 티어·제목 등 메타데이터와 사용자 정보를 조회

### 배치 스케줄링 (Quartz)
| Job | 스케줄 | 역할 |
|---|---|---|
| `RecordWeeklyResultJob` | 매주 일요일 23:59 | 백준 현황 갱신 → 주간 결과 정산(점수·벌금 확정) → 다음 주 결과 레코드 생성 → 스트릭 갱신 |
| `RecordUserLevelJob` | 매일 00:01 | 사용자별 solved.ac 티어/레벨 변화 기록 |

### 패키지 구조
도메인 주도(domain-driven) 방식으로 계층을 분리했습니다.

```
com.baektracker
├── domain/          # 핵심 도메인
│   ├── baekjoon/    #  - 백준 크롤링 서비스
│   ├── problem/     #  - 문제 / 풀이 / 주차별 문제
│   ├── user/        #  - 사용자
│   └── weekly_result/ # - 주간 결과 / 벌금 / 스트릭
├── global/          # 전역 설정
│   ├── config/      #  - Security, QueryDSL, Quartz, RestClient 등
│   ├── job/         #  - Quartz Job 정의
│   └── exception/   #  - 전역 예외 처리
├── common/          # 공용 유틸 / 베이스 엔티티
└── mapper/          # MyBatis 매퍼 인터페이스
```

---

## API 개요

| Method | Endpoint | 설명 |
|---|---|---|
| `GET` | `/api/v1/user` | 전체 사용자 목록 조회 |
| `PATCH` | `/api/v1/user/pwd` | 비밀번호 변경 |
| `GET` | `/api/v1/problem?date=` | 특정 주차 사용자별 풀이 진행 현황 |
| `GET` | `/api/v1/problem/reload` | 백준 현황 수동 갱신 |
| `GET` | `/api/v1/problem/search?keyword=` | 문제 검색 (solved.ac) |
| `GET` | `/api/v1/weekly-problem?date=` | 주차별 문제 조회 |
| `POST` | `/api/v1/weekly-problem` | 주차별 문제 등록/수정 |
| `POST` | `/api/v1/weekly-result/pass` | 주간 패스 신청 |
| `GET` | `/api/v1/weekly-result/fine/month?date=` | 월별 벌금 현황 |
| `GET` | `/api/v1/weekly-result/fine/total` | 누적 벌금 현황 |

---

## 실행 방법

### 환경 변수
`.env.example`을 복사해 `.env`를 작성합니다.

```bash
cp .env.example .env
```

```env
SPRING_PROFILES_ACTIVE=prod
PORT=20000
DB_URL=jdbc:mysql://...
MYSQL_USERNAME=
MYSQL_PASSWORD=
SSL_KEY_PATH=
SSL_KEY_PASSWORD=
```

### 로컬 실행
```bash
# 프론트엔드 빌드 + 백엔드 실행 (React 빌드 결과물이 static 리소스로 번들링됨)
./gradlew bootRun
```

프론트엔드를 개발 모드로 따로 띄우려면:
```bash
cd src/main/frontend
npm install
npm start
```

### Docker 배포
```bash
./gradlew bootJar
docker build -t baektracker:latest .
docker compose up -d
```

---

## 데이터베이스

Flyway로 스키마를 버전 관리하며, 주요 테이블은 다음과 같습니다.

- `users` — 사용자 정보 및 크롤링 커서(`last_read`)
- `problems` — 백준 문제 메타데이터(제목·티어·제한시간)
- `solved_problems` — 사용자별 제출/풀이 내역
- `weekly_problems` — 주차별 지정 문제
- `weekly_results` — 주간 점수·상태·벌금

스트릭 초기화, 주간 결과 리셋 등은 저장 프로시저(`db/procedure`)로 관리합니다.
