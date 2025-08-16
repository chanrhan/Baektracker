import {cm} from "../setup/utils/cm";
import styles from "../../css/styles.module.css";
import {DesignUtils} from "../utils/DesignUtils";
import React, {useEffect, useState} from "react";
import {useTooltipHandlers} from "../setup/utils/TooltipUtils";


export function MarkedProblemItem({problem, index}){
    const tooltip = useTooltipHandlers(<div>
        <span>{problem.title}</span>
        <div>
            {
                problem.co_solvers && problem.co_solvers.map((v,i)=>{
                    return <span style={{
                        fontSize: '12px',
                        marginRight: '5px'
                    }}>{v}</span>
                })
            }
        </div>
    </div>)

    const result_id = problem.result_id;




    return (
        <div key={index} onClick={()=>{
            window.open(`https://www.acmicpc.net/problem/${problem.problem_id}`, "_blank")
        }}
             className={cm(`${styles.userProgressProblemItem} ${problem.solved ? styles.userProgressSolved : styles.userProgressUnsolved}`,
                 `${problem.is_shared_problem == 1 && styles.is_shared_problem}`)}
             onMouseEnter={tooltip.onMouseEnter}
             onMouseLeave={tooltip.onMouseLeave}
        >
            <div
                className={styles.userProgressProblemAccent}
                style={{backgroundColor: DesignUtils.getTierColor(problem.level)}}
            />
            <div className={styles.userProgressProblemContent}>
                <span className={cm(styles.tierIcon, `${DesignUtils.getTierIconClass(problem.level)}`)}></span>
                <span className={cm(styles.userProgressProblemNumber, `${result_id !== 4 && styles.red_text}`)}>{problem.problem_id}</span>
            </div>
        </div>
    )
}