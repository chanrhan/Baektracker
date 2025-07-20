import styles from '../../css/styles.module.css'

export default function SharedProblemsSection() {
  return (
    <div className={styles.sharedProblemsSection}>
      {/* Header */}
      <div className={styles.sharedProblemsHeaderContainer}>
        <div className={styles.sharedProblemsHeader}>
          <h2 className={styles.sharedProblemsTitle}>주간 공통 문제</h2>
        </div>
      </div>

      {/* Problem Cards Container */}
      <div className={styles.cardsContainer}>
        {/* Problem Card */}
        <div className={styles.problemCard}>
          {/* Problem Info Frame */}
          <div className={styles.infoContainer}>
            <div className={styles.infoFrame}>
              {/* Bronze Accent */}
              <div className={styles.bronzeAccent}></div>
              
              {/* Content */}
              <div className={styles.content}>
                {/* Tier Icon Container */}
                <div className={styles.tierIconContainer}>
                  <div className={styles.tierIcon}></div>
                  
                  {/* Problem Number */}
                  <div className={styles.problemNumber}>2638</div>
                  
                  {/* Problem Title */}
                  <div className={styles.problemTitle}>치즈</div>
                </div>
              </div>
            </div>
          </div>

          {/* Rankings Table */}
          <div className={styles.tableContainer}>
            <div className={styles.table}>
              {/* Table Header */}
              <div className={styles.tableHeaderContainer}>
                <div className={styles.tableHeader}>
                  <span className={styles.headerRank}>순위</span>
                  <span className={styles.headerName}>이름</span>
                  <span className={styles.headerTime}>시간</span>
                  <span className={styles.headerMemory}>메모리</span>
                </div>
              </div>
              
              {/* Table Rows */}
              <div className={styles.tableRows}>
                {/* Row 1 */}
                <div className={styles.tableRow}>
                  <span className={styles.rank}>1</span>
                  <span className={styles.name}>김개발</span>
                  <span className={styles.time}>324ms</span>
                  <span className={styles.memory}>2048KB</span>
                </div>
                
                {/* Row 2 */}
                <div className={styles.tableRow}>
                  <span className={styles.rank}>2</span>
                  <span className={styles.name}>박코딩</span>
                  <span className={styles.time}>456ms</span>
                  <span className={styles.memory2}>1800KB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 