import React, { useState } from "react"
import styles from "../../css/styles.module.css"
import {Header} from "./Header";
import {DateUtils} from "../setup/utils/DateUtils";
import {Body} from "./Body";

// 메인 컴포넌트
const MainPage = () => {
  const today = new Date();

  const initFromDate = DateUtils.getFirstDateOfWeek(today);
  const initToDate = DateUtils.getLastDateOfWeek(today);
  const [fromDate, setFromDate] = useState(DateUtils.dateToStringYYMMdd(initFromDate));
  const [toDate, setToDate] = useState(DateUtils.dateToStringYYMMdd(initToDate));

  return (
    <div className={styles.container}>
      <Header fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate}/>
      <Body fromDate={fromDate} toDate={toDate}/>

    </div>
  )
}

export default MainPage 