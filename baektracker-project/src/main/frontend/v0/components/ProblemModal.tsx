"use client"

import { useState } from "react"
import styles from "./ProblemModal.module.css"

interface ProblemModalProps {
  onClose: () => void
}

export default function ProblemModal({ onClose }: ProblemModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([
    { number: 1000, title: "A+B", level: "Bronze V", alreadySolved: 5 },
    { number: 1463, title: "1로 만들기", level: "Silver III", alreadySolved: 2 },
    { number: 7576, title: "토마토", level: "Gold V", alreadySolved: 1 },
  ])

  const handleSearch = () => {
    // 검색 로직 구현
    console.log("Searching for:", searchQuery)
  }

  const handleAddProblem = (problem: any) => {
    // 문제 추가 로직
    console.log("Adding problem:", problem)
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>문제 출제</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.searchSection}>
            <div className={styles.searchInput}>
              <input
                type="text"
                placeholder="문제 번호 또는 제목으로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <button onClick={handleSearch}>검색</button>
            </div>
          </div>

          <div className={styles.resultsSection}>
            <h3 className={styles.resultsTitle}>검색 결과</h3>
            <div className={styles.problemList}>
              {searchResults.map((problem) => (
                <div key={problem.number} className={styles.problemItem}>
                  <div className={styles.problemInfo}>
                    <span className={styles.problemNumber}>#{problem.number}</span>
                    <span className={styles.problemTitle}>{problem.title}</span>
                    <span className={styles.problemLevel}>{problem.level}</span>
                  </div>
                  <div className={styles.problemStats}>
                    <span className={styles.solvedCount}>{problem.alreadySolved}명 풀이 완료</span>
                    <button className={styles.addButton} onClick={() => handleAddProblem(problem)}>
                      출제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.limitInfo}>
              <span>이번 주 출제 가능한 문제: 1/3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
