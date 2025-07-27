"use client"

import { useState } from "react"
import styles from "./page.module.css"
import WeekSelector from "src/main/frontend/v0/components/WeekSelector"
import UserProgress from "src/main/frontend/v0/components/UserProgress"
import WeeklyProblems from "src/main/frontend/v0/components/WeeklyProblems"
import FineInfo from "src/main/frontend/v0/components/FineInfo"
import ProblemModal from "src/main/frontend/v0/components/ProblemModal"
import ReceiptModal from "src/main/frontend/v0/components/ReceiptModal"
import CalendarModal from "src/main/frontend/v0/components/CalendarModal"

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "김철수",
    rank: "Gold III",
    currentScore: 85,
    targetScore: 100,
    consecutiveWeeks: 3,
    lastWeekFailed: false,
  },
  {
    id: 2,
    name: "이영희",
    rank: "Platinum V",
    currentScore: 92,
    targetScore: 100,
    consecutiveWeeks: 5,
    lastWeekFailed: false,
  },
  {
    id: 3,
    name: "박민수",
    rank: "Silver II",
    currentScore: 45,
    targetScore: 100,
    consecutiveWeeks: 0,
    lastWeekFailed: true,
  },
  {
    id: 4,
    name: "정수진",
    rank: "Gold V",
    currentScore: 78,
    targetScore: 100,
    consecutiveWeeks: 2,
    lastWeekFailed: false,
  },
  {
    id: 5,
    name: "최동욱",
    rank: "Platinum II",
    currentScore: 100,
    targetScore: 100,
    consecutiveWeeks: 7,
    lastWeekFailed: false,
  },
  {
    id: 6,
    name: "한지민",
    rank: "Gold IV",
    currentScore: 67,
    targetScore: 100,
    consecutiveWeeks: 1,
    lastWeekFailed: false,
  },
  {
    id: 7,
    name: "윤태호",
    rank: "Bronze I",
    currentScore: 23,
    targetScore: 100,
    consecutiveWeeks: 0,
    lastWeekFailed: true,
  },
]

const mockProblems = [
  {
    id: 1,
    number: 1000,
    title: "A+B",
    level: "Bronze V",
    solvers: [
      { rank: 1, language: "Python", name: "최동욱", time: "00:02:15" },
      { rank: 2, language: "C++", name: "이영희", time: "00:03:42" },
      { rank: 3, language: "Java", name: "김철수", time: "00:05:18" },
    ],
  },
  {
    id: 2,
    number: 1463,
    title: "1로 만들기",
    level: "Silver III",
    solvers: [
      { rank: 1, language: "Python", name: "이영희", time: "00:15:23" },
      { rank: 2, language: "C++", name: "최동욱", time: "00:18:45" },
    ],
  },
  {
    id: 3,
    number: 7576,
    title: "토마토",
    level: "Gold V",
    solvers: [{ rank: 1, language: "Java", name: "정수진", time: "00:25:12" }],
  },
]

export default function Home() {
  const [currentWeek, setCurrentWeek] = useState("2025-07-14 ~ 2025-07-21 (30주차)")
  const [showProblemModal, setShowProblemModal] = useState(false)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [totalFine, setTotalFine] = useState(125000)

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Baektracker</h1>
        <WeekSelector
          currentWeek={currentWeek}
          onPrevWeek={() => {
            /* 이전 주 로직 */
          }}
          onNextWeek={() => {
            /* 다음 주 로직 */
          }}
          onToday={() => {
            /* 오늘로 이동 로직 */
          }}
          onShowCalendar={() => setShowCalendarModal(true)}
        />
        <FineInfo totalFine={totalFine} onShowReceipt={() => setShowReceiptModal(true)} className={styles.fineInfo} />
      </header>

      <main className={styles.main}>
        <section className={styles.problemsSection}>
          <div className={styles.problemsHeader}>
            <h2 className={styles.sectionTitle}>주간 문제</h2>
            <button className={styles.addButton} onClick={() => setShowProblemModal(true)}>
              문제 출제
            </button>
          </div>
          <WeeklyProblems problems={mockProblems} />
        </section>

        <section className={styles.progressSection}>
          <h2 className={styles.sectionTitle}>개별 진행 현황</h2>
          <UserProgress users={mockUsers} />
        </section>
      </main>

      {showProblemModal && <ProblemModal onClose={() => setShowProblemModal(false)} />}

      {showReceiptModal && <ReceiptModal onClose={() => setShowReceiptModal(false)} />}

      {showCalendarModal && (
        <CalendarModal
          onClose={() => setShowCalendarModal(false)}
          onSelectWeek={(week) => {
            setCurrentWeek(week)
            setShowCalendarModal(false)
          }}
        />
      )}
    </div>
  )
}
