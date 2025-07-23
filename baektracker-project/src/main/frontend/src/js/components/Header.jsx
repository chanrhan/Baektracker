import React, {useEffect, useState} from 'react'
import styles from "../../css/styles.module.css"
import useApi from "../setup/hook/useApi";
import {DateUtils} from "../setup/utils/DateUtils";
import Study from "../../css/study.module.css";
import {WeekSelectModal} from "../modal/menu/WeekSelectModal";

export default function Header({fromDate, toDate, setFromDate, setToDate}) {
  const {problemApi} = useApi();
  const today = new Date();


  const [totalFine, setTotalFine] = useState(0)

  useEffect(() => {
    getTotalFine()
  }, []);

  const getTotalFine = ()=>{
    problemApi.getTotalFine().then(({data})=>{
      if(data){
        // setFineItem(data)
        let sum=0;
        for(const i of data){
          sum += i.amount;
        }
        // console.log(sum)
        setTotalFine(sum)
      }
    })
  }

  const setWeekDates = (date: Date)=>{
    const fd = DateUtils.getFirstDateOfWeek(date);
    const td = DateUtils.getLastDateOfWeek(date);
    setFromDate(DateUtils.dateToStringYYMMdd(fd))
    setToDate(DateUtils.dateToStringYYMMdd(td))
  }

  const handlePrevWeek = ()=>{
    const newDate = new Date(fromDate);
    DateUtils.subDate(newDate, 7);
    setWeekDates(newDate);
  }

  const handleNextWeek = ()=>{
    const newDate = new Date(fromDate);
    DateUtils.addDate(newDate, 7);

    setWeekDates(newDate);
  }

  const handleWeek = (year, month, day)=>{
    const dt = new Date(year, month, day);
    setWeekDates(dt);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Title Container */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Baektracker
          </h1>
        </div>

        {/* Date Container */}
        <div className={styles.dateContainer}>
          <div className={styles.dateControls}>
            {/* Previous Button */}
            <button type='button' className={styles.navButton} onClick={handlePrevWeek}>
              <svg width="12" height="12" fill="currentColor">
                <path d="M8 10l-3-3 3-3"/>
              </svg>
            </button>

            {/* Date Text */}
            <div className={styles.dateText}>
              {fromDate} ~ {toDate}
            </div>

            {/* Next Button */}
            <button type='button'  className={styles.navButton} onClick={handleNextWeek}>
              <svg width="12" height="12" fill="currentColor">
                <path d="M4 10l3-3-3-3"/>
              </svg>
            </button>
          </div>

          {/* Buttons */}
          <button className={styles.todayButton} onClick={()=>{
            setWeekDates(today)
          }}>
            오늘
          </button>
          <WeekSelectModal rootClassName={styles.dateSelectButton}
                           date={fromDate}
                           onSelect={handleWeek}>
            날짜 선택
          </WeekSelectModal>
        </div>

        {/* Fine Display */}
        <div className={styles.fineDisplay}>
          <span className={styles.fineLabel}>누적 벌금 :</span>
          <span className={styles.fineAmount}>{totalFine.toLocaleString()}원</span>
        </div>
      </div>
    </header>
  )
} 