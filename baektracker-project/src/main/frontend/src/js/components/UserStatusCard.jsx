import styles from "../../css/styles.module.css";
import React from "react";
import {SolvedProblemCard} from "./SolvedProblemCard";
import {DesignUtils} from "../utils/DesignUtils";
import {cm} from "../setup/utils/cm";
import {useTooltipHandlers} from "../setup/utils/TooltipUtils";

export function UserStatusCard({level, id, name, streak, score, solvedList, sharedSolved}){
    const per = (score >= 60) ? 100 : Math.floor((Number)(score / 60) * 100);

    const fireTooltip = useTooltipHandlers(
        <div>

        </div>
    );

    return (
        <div className={styles.memberCard}>
            {/* Gold Accent */}
            <div className={styles.goldAccent} style={{
                backgroundColor: `${DesignUtils.getTierColor(level)}`
            }}></div>

            <div className={styles.memberContent}>
                <div className={cm(styles.memberTierIcon, DesignUtils.getLevelIconClass(level))}></div>

                <div className={styles.memberInfo}>
                        <span className={styles.memberName} style={{
                            color: `${sharedSolved ? `#90d700` : 'white'}`
                        }}>{name}</span>

                    <div className={styles.streakBadge}>
                        <span className={cm(styles.streakIcon, `${streak === 0 && styles.cold}`)}></span>
                        {
                            streak > 0 && <span className={styles.streakNumber}>{streak}</span>
                        }
                    </div>
                </div>

                {/* Progress Container */}
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{
                            width: `${per}%`,
                            backgroundColor: `${DesignUtils.getBarColor(per)}`
                        }}></div>
                    </div>
                    <div className={styles.scoreText}>
                        ( {score} / 60 )
                    </div>
                </div>

                {/* Solved Problems */}
                <div className={styles.solvedProblems}>
                    {/* Solved Card */}
                    {
                        solvedList && solvedList.map((v, i) => {
                            return <SolvedProblemCard key={i} level={v.level}
                                                      title={v.title}
                                                      solvedList={v.co_solvers}
                                                      id={v.problem_id} submitId={v.submit_id}
                                                      resultId={v.result_id}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}