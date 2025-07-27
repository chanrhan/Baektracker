import styles from "./WeeklyProblems.module.css"
import TierIcon from "./TierIcon"

interface Solver {
  rank: number
  language: string
  name: string
  time: string
}

interface Problem {
  id: number
  number: number
  title: string
  level: string
  solvers: Solver[]
}

interface WeeklyProblemsProps {
  problems: Problem[]
}

export default function WeeklyProblems({ problems }: WeeklyProblemsProps) {
  const getLevelColor = (level: string) => {
    if (level.includes("Bronze")) return "#cd7f32"
    if (level.includes("Silver")) return "#c0c0c0"
    if (level.includes("Gold")) return "#ffd700"
    if (level.includes("Platinum")) return "#00ff9f"
    if (level.includes("Diamond")) return "#00bfff"
    if (level.includes("Ruby")) return "#ff0040"
    return "#6b7280"
  }

  const getSolverStatus = (solverCount: number) => {
    if (solverCount === 7) {
      return { text: "완료", className: styles.allSolved }
    }
    if (solverCount === 0) {
      return { text: "대기", className: styles.noneSolved }
    }
    return { text: `${solverCount}/7`, className: styles.partialSolved }
  }

  return (
    <div className={styles.container}>
      <div className={styles.problemsGrid}>
        {problems.map((problem) => {
          const status = getSolverStatus(problem.solvers.length)

          return (
            <div key={problem.id} className={styles.problemCard}>
              <div className={styles.accentBar} style={{ backgroundColor: getLevelColor(problem.level) }} />
              <div className={styles.problemHeader}>
                <div className={styles.problemInfo}>
                  <TierIcon tier={problem.level} size="small" showText={true} />
                  <h3 className={styles.problemTitle}>
                    #{problem.number} {problem.title}
                  </h3>
                </div>
              </div>

              <div className={styles.solverStatus}>
                <span className={`${styles.statusBadge} ${status.className}`}>{status.text}</span>
              </div>
            </div>
          )
        })}

        {problems.length < 3 && (
          <>
            {Array.from({ length: 3 - problems.length }).map((_, index) => (
              <div key={index} className={styles.emptySlot}>
                <span className={styles.emptyText}>문제를 출제해주세요</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
