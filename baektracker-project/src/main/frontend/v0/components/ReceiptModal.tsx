"use client"

import { useState } from "react"
import styles from "./ReceiptModal.module.css"

interface ReceiptModalProps {
  onClose: () => void
}

const mockReceiptData = {
  "2025-01": {
    total: 45000,
    users: [
      { name: "김철수", amount: 5000, weeks: ["1주차"] },
      { name: "박민수", amount: 15000, weeks: ["1주차", "2주차", "3주차"] },
      { name: "윤태호", amount: 25000, weeks: ["1주차", "2주차", "3주차", "4주차", "5주차"] },
    ],
  },
  "2025-02": {
    total: 35000,
    users: [
      { name: "정수진", amount: 10000, weeks: ["1주차", "2주차"] },
      { name: "박민수", amount: 10000, weeks: ["1주차", "2주차"] },
      { name: "윤태호", amount: 15000, weeks: ["1주차", "2주차", "3주차"] },
    ],
  },
  "2025-03": {
    total: 45000,
    users: [
      { name: "한지민", amount: 5000, weeks: ["2주차"] },
      { name: "박민수", amount: 20000, weeks: ["1주차", "2주차", "3주차", "4주차"] },
      { name: "윤태호", amount: 20000, weeks: ["1주차", "2주차", "3주차", "4주차"] },
    ],
  },
}

export default function ReceiptModal({ onClose }: ReceiptModalProps) {
  const [selectedMonth, setSelectedMonth] = useState("2025-03")
  const months = Object.keys(mockReceiptData)

  const currentData = mockReceiptData[selectedMonth as keyof typeof mockReceiptData]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount)
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>벌금 영수증</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.monthTabs}>
            {months.map((month) => (
              <button
                key={month}
                className={`${styles.monthTab} ${selectedMonth === month ? styles.active : ""}`}
                onClick={() => setSelectedMonth(month)}
              >
                {month}
              </button>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.totalAmount}>
              <span className={styles.totalLabel}>전체 누적 벌금</span>
              <span className={styles.totalValue}>₩{formatCurrency(125000)}</span>
            </div>
            <div className={styles.monthAmount}>
              <span className={styles.monthLabel}>{selectedMonth} 벌금</span>
              <span className={styles.monthValue}>₩{formatCurrency(currentData.total)}</span>
            </div>
          </div>

          <div className={styles.userList}>
            {currentData.users.map((user, index) => (
              <div key={index} className={styles.userItem}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.userAmount}>₩{formatCurrency(user.amount)}</span>
                </div>
                <div className={styles.weekList}>
                  {user.weeks.map((week) => (
                    <span key={week} className={styles.weekBadge}>
                      {week}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
