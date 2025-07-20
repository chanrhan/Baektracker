import SharedProblemsSection from "./SharedProblemsSection";
import WeeklyRankingSection from "./WeeklyRankingSection";
import styles from '../../css/styles.module.css'

export default function PublicSection() {
  return (
    <div className={styles.publicSection}>
      <div className={styles.publicContainer}>
        <SharedProblemsSection />
        <div className={styles.weeklyRankingWrapper}>
          <WeeklyRankingSection />
        </div>
      </div>
    </div>
  )
} 