import styles from "../../css/styles.module.css";
import React from "react";
import {DesignUtils} from "../coding_study/DesignUtils";
import {cm} from "../setup/utils/cm";

export function SolvedProblemCard({level, id, resultId}){
    return (
        <div className={styles.solvedCard}>
            <div className={styles.solvedAccent}></div>
            <div className={styles.solvedContent}>
                <div className={cm(styles.solvedIcon, DesignUtils.getLevelIconClass(level))}></div>
                <span className={styles.solvedNumber}>{id}</span>
            </div>
        </div>
    )
}