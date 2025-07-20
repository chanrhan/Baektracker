import { useState } from 'react'
import styles from "../../css/styles.module.css"

export default function Header() {
  const [currentWeek] = useState('2025-01-14 ~ 2025-01-20')
  const [totalFine] = useState(10000)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Title Container */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Baektracker
          </h1>
        </div>

        {/* Date Container */}
        <div className={styles.dateContainer}>
          <div className={styles.dateControls}>
            {/* Previous Button */}
            <button className={styles.navButton}>
              <svg width="12" height="12" fill="currentColor">
                <path d="M8 10l-3-3 3-3"/>
              </svg>
            </button>

            {/* Date Text */}
            <div className={styles.dateText}>
              {currentWeek}
            </div>

            {/* Next Button */}
            <button className={styles.navButton}>
              <svg width="12" height="12" fill="currentColor">
                <path d="M4 10l3-3-3-3"/>
              </svg>
            </button>
          </div>

          {/* Buttons */}
          <button className={styles.todayButton}>
            오늘
          </button>
          
          <button className={styles.dateSelectButton}>
            날짜 선택
          </button>
        </div>

        {/* Fine Display */}
        <div className={styles.fineDisplay}>
          <span className={styles.fineLabel}>누적 벌금 :</span>
          <span className={styles.fineAmount}>{totalFine.toLocaleString()}원</span>
        </div>
      </div>
    </header>
  )
} 