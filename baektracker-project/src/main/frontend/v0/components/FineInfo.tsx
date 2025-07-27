"use client"

import styles from "./FineInfo.module.css"

interface FineInfoProps {
  totalFine: number
  onShowReceipt: () => void
  className?: string
}

export default function FineInfo({ totalFine, onShowReceipt, className }: FineInfoProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount)
  }

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.fineAmount}>
        <span className={styles.label}>누적 벌금</span>
        <span className={styles.amount}>₩{formatCurrency(totalFine)}</span>
      </div>
      <button className={styles.receiptButton} onClick={onShowReceipt}>
        영수증 보기
      </button>
    </div>
  )
}
