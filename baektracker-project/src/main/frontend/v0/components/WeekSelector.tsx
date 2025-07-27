"use client"

import styles from "./WeekSelector.module.css"

interface WeekSelectorProps {
  currentWeek: string
  onPrevWeek: () => void
  onNextWeek: () => void
  onToday: () => void
  onShowCalendar: () => void
}

export default function WeekSelector({
  currentWeek,
  onPrevWeek,
  onNextWeek,
  onToday,
  onShowCalendar,
}: WeekSelectorProps) {
  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <button className={styles.navButton} onClick={onPrevWeek}>
          ←
        </button>
        <button className={styles.weekButton} onClick={onShowCalendar}>
          {currentWeek}
        </button>
        <button className={styles.navButton} onClick={onNextWeek}>
          →
        </button>
      </div>
      <button className={styles.todayButton} onClick={onToday}>
        오늘
      </button>
    </div>
  )
}
