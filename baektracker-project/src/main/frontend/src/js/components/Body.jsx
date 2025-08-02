import styles from "../../css/styles.module.css";
import React from "react";
import {UserProgress} from "./UserProgress";
import {WeekProblems} from "./WeekProblems";

export function Body({fromDate, toDate}){
    return (
        <main className={styles.main}>
            <WeekProblems fromDate={fromDate} toDate={toDate}/>
            <UserProgress fromDate={fromDate} toDate={toDate}/>
        </main>
    )
}