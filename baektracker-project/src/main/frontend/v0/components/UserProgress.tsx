import styles from "./UserProgress.module.css"
import TierIcon from "./TierIcon"

interface User {
  id: number
  name: string
  rank: string
  currentScore: number
  targetScore: number
  consecutiveWeeks: number
  lastWeekFailed: boolean
}

interface UserProgressProps {
  users: User[]
}

export default function UserProgress({ users }: UserProgressProps) {
  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getRankColor = (rank: string) => {
    if (rank.includes("Bronze")) return "#cd7f32"
    if (rank.includes("Silver")) return "#c0c0c0"
    if (rank.includes("Gold")) return "#ffd700"
    if (rank.includes("Platinum")) return "#00ff9f"
    if (rank.includes("Diamond")) return "#00bfff"
    if (rank.includes("Ruby")) return "#ff0040"
    return "#6b7280"
  }

  const getProblemColor = (level: string) => {
    if (level.includes("Bronze")) return "#cd7f32"
    if (level.includes("Silver")) return "#c0c0c0"
    if (level.includes("Gold")) return "#ffd700"
    if (level.includes("Platinum")) return "#00ff9f"
    if (level.includes("Diamond")) return "#00bfff"
    if (level.includes("Ruby")) return "#ff0040"
    return "#6b7280"
  }

  const renderStreakIcon = (consecutiveWeeks: number, lastWeekFailed: boolean) => {
    if (lastWeekFailed) {
      return <span className={styles.coldStreak}>❄️</span>
    }
    if (consecutiveWeeks > 0) {
      return <span className={styles.hotStreak}>🔥 {consecutiveWeeks}</span>
    }
    return null
  }

  // 랜덤 문제 생성 함수
  const generateRandomProblems = () => {
    const allProblems = [
      { level: "Silver III", number: "1463", solved: true },
      { level: "Gold V", number: "7576", solved: false },
      { level: "Gold IV", number: "9019", solved: false },
      { level: "Silver I", number: "1932", solved: true },
      { level: "Gold III", number: "1167", solved: false },
      { level: "Bronze II", number: "2798", solved: true },
      { level: "Platinum IV", number: "1786", solved: false },
      { level: "Silver IV", number: "1018", solved: true },
      { level: "Gold II", number: "12015", solved: false },
      { level: "Bronze I", number: "1000", solved: true },
    ]

    // 3~10개 사이 랜덤 선택
    const count = Math.floor(Math.random() * 8) + 3
    const shuffled = [...allProblems].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, count)

    // 맞은 문제부터 정렬
    return selected.sort((a, b) => {
      if (a.solved && !b.solved) return -1
      if (!a.solved && b.solved) return 1
      return 0
    })
  }

  return (
    <div className={styles.container}>
      {users.map((user) => {
        const problems = generateRandomProblems()

        return (
          <div key={user.id} className={styles.userCard}>
            <div className={styles.userAccent} style={{ backgroundColor: getRankColor(user.rank) }} />
            <div className={styles.userHeader}>
              <div className={styles.userInfo}>
                <TierIcon tier={user.rank} size="small" />
                <span className={styles.userName}>{user.name}</span>
              </div>
              {renderStreakIcon(user.consecutiveWeeks, user.lastWeekFailed)}
            </div>

            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${getProgressPercentage(user.currentScore, user.targetScore)}%` }}
                />
              </div>
              <span className={styles.progressText}>
                {user.currentScore} / {user.targetScore}
              </span>
            </div>

            <div className={styles.challengeProblems}>
              <div className={styles.problemGrid}>
                {problems.map((problem, index) => (
                  <div
                    key={index}
                    className={`${styles.problemItem} ${problem.solved ? styles.solved : styles.unsolved}`}
                  >
                    <div className={styles.problemAccent} style={{ backgroundColor: getProblemColor(problem.level) }} />
                    <div className={styles.problemContent}>
                      <TierIcon tier={problem.level} size="small" />
                      <span className={styles.problemNumber}>#{problem.number}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
