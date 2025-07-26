import styles from "../../css/styles.module.css";
import React from "react";
import {DesignUtils} from "../utils/DesignUtils";
import {cm} from "../setup/utils/cm";
import {useTooltipHandlers} from "../setup/utils/TooltipUtils";

export function SolvedProblemCard({level, id, resultId, title, solvedList}){
    const tooltip = useTooltipHandlers(
        <div>
            <div style={{
                textAlign: 'center',
                fontWeight: '700',
                width: 'fit-content'
            }}>{title}</div>
            {
                solvedList && <span style={{
                    fontSize: '11px'
                }}>맞은사람 : {
                    solvedList.map((v, i) => {
                        return <span style={{
                            marginRight: '4px'
                        }}>{v}</span>
                    })
                }</span>
            }
        </div>
    );
    return (
        <div className={styles.solvedCard} {...tooltip} onClick={e=>{
            e.preventDefault();
            window.open(`https://www.acmicpc.net/problem/${id}`, "_blank")
        }} >
            <div className={styles.solvedAccent} style={{
                backgroundColor: `${DesignUtils.getTierColor(level)}`
            }}></div>
            <div className={styles.solvedContent} >
                <div className={cm(styles.solvedIcon, DesignUtils.getLevelIconClass(level))}></div>
                <span className={styles.solvedNumber} style={{
                    color: `${DesignUtils.getResultColor(resultId)}`
                }}>{id}</span>
            </div>
        </div>
    )
}