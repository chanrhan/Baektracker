import Header from "./Header";
import PublicSection from "./PublicSection";
import PrivateSection from "./PrivateSection";
import styles from '../../css/styles.module.css'
import {DateUtils} from "../setup/utils/DateUtils";
import {useState} from "react";
import {MainBody} from "./MainBody";

export function Main(){
    const today = new Date();

    const initFromDate = DateUtils.getFirstDateOfWeek(today);
    const initToDate = DateUtils.getLastDateOfWeek(today);
    const [fromDate, setFromDate] = useState(DateUtils.dateToStringYYMMdd(initFromDate));
    const [toDate, setToDate] = useState(DateUtils.dateToStringYYMMdd(initToDate));

    return (
        <div className={styles.pageContainer}>
            <Header fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate}/>
            <MainBody fromDate={fromDate} toDate={toDate}/>
        </div>
    )
}