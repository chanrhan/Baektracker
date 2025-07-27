"use client"

import { useState } from "react"
import styles from "./CalendarModal.module.css"

interface CalendarModalProps {
  onClose: () => void
  onSelectWeek: (week: string) => void
}

export default function CalendarModal({ onClose, onSelectWeek }: CalendarModalProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 6)) // July 2025

  const weeks = [
    "2025-07-07 ~ 2025-07-13 (29주차)",
    "2025-07-14 ~ 2025-07-21 (30주차)",
    "2025-07-21 ~ 2025-07-27 (31주차)",
    "2025-07-28 ~ 2025-08-03 (32주차)",
    "2025-08-04 ~ 2025-08-10 (33주차)",
    "2025-08-11 ~ 2025-08-17 (34주차)",
  ]

  const handleWeekSelect = (week: string) => {
    onSelectWeek(week)
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("ko-KR", { year: "numeric", month: "long" })
  }

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>주차 선택</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.monthNavigation}>
            <button className={styles.navButton} onClick={goToPrevMonth}>
              ←
            </button>
            <span className={styles.monthTitle}>{formatMonth(currentMonth)}</span>
            <button className={styles.navButton} onClick={goToNextMonth}>
              →
            </button>
          </div>

          <div className={styles.weekList}>
            {weeks.map((week, index) => (
              <button key={index} className={styles.weekItem} onClick={() => handleWeekSelect(week)}>
                {week}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
