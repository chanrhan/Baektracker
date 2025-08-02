import styles from "../../css/styles.module.css";
import React from "react";

export function WeekCalendarModal(){
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h3>캘린더 모달</h3>
                <p>캘린더 기능이 여기에 구현됩니다.</p>
                <button onClick={() => setShowCalendarModal(false)}>닫기</button>
            </div>
        </div>
    )
}