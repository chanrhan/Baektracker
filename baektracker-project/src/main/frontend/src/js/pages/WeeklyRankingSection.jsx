import styles from '../../css/styles.module.css'

export default function WeeklyRankingSection() {
  return (
    <div className={styles.weeklyRankingSection}>
      {/* Header */}
      <div className={styles.weeklyRankingHeaderContainer}>
        <div className={styles.weeklyRankingHeader}>
          <h2 className={styles.weeklyRankingTitle}>주간 순위</h2>
        </div>
      </div>

      {/* Content */}
      <div className={styles.weeklyRankingContent}>
        <div className={styles.loadingText}>
          주간 순위 데이터를 로딩 중입니다...
        </div>
      </div>
    </div>
  )
} 