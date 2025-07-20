import styles from '../../css/styles.module.css'

export default function PrivateSection() {
  return (
    <div className={styles.privateSection}>
      <div className={styles.privateContainer}>
        <div className={styles.teamStatusSection}>
          {/* Header */}
          <div className={styles.teamStatusHeaderContainer}>
            <div className={styles.teamStatusHeader}>
              <h2 className={styles.teamStatusTitle}>이번주 문제풀이 현황</h2>
            </div>
          </div>

          {/* Member Card */}
          <div className={styles.memberCardContainer}>
            <div className={styles.memberCard}>
              {/* Gold Accent */}
              <div className={styles.goldAccent}></div>
              
              {/* Content */}
              <div className={styles.memberContent}>
                {/* Tier Icon */}
                <div className={styles.memberTierIcon}></div>

                {/* Member Info */}
                <div className={styles.memberInfo}>
                  {/* Name */}
                  <span className={styles.memberName}>김개발</span>
                  
                  {/* Streak Badge */}
                  <div className={styles.streakBadge}>
                    <div className={styles.streakIcon}></div>
                    <span className={styles.streakNumber}>3</span>
                  </div>
                </div>

                {/* Progress Container */}
                <div className={styles.progressContainer}>
                  {/* Progress Bar */}
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill}></div>
                  </div>
                  {/* Score Text */}
                  <div className={styles.scoreText}>
                    ( 45 / 60 )
                  </div>
                </div>

                {/* Solved Problems */}
                <div className={styles.solvedProblems}>
                  {/* Solved Card */}
                  <div className={styles.solvedCard}>
                    <div className={styles.solvedAccent}></div>
                    <div className={styles.solvedContent}>
                      <div className={styles.solvedIcon}></div>
                      <span className={styles.solvedNumber}>1234</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 