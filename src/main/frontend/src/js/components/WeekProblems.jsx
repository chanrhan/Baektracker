import styles from "../../css/styles.module.css";
import React, {useEffect, useState} from "react";
import useModal from "../setup/hook/useModal";
import {ModalType} from "../setup/modal/ModalType";
import {DesignUtils} from "../utils/DesignUtils";
import {cm} from "../setup/utils/cm";
import {useApi} from "../api/useApi";

// WeeklyProblems 컴포넌트

export function WeekProblems({fromDate, toDate}) {
    const {problemApi} = useApi();
    const modal = useModal();

    const [weeklyProblems, setWeeklyProblems] = useState([]);

    const [weeklyProblemInputs, setWeeklyProblemInputs] = useState([-1, -1, -1])

    useEffect(() => {
        getWeeklyProblems();
    }, [fromDate, toDate]);

    const getWeeklyProblems = () => {
        problemApi.getWeeklyProblem(fromDate).then(({status, data}) => {
            if (data && data.items) {
                const copy = [...weeklyProblemInputs];
                for (const i in data.items) {
                    copy[i] = data.items[i].problem_id
                }
                setWeeklyProblemInputs(copy);
                setWeeklyProblems(data.items);
            }
        })
    }

    const openWeeklyProblemModal = () => {
        modal.openModal(ModalType.LAYER.WeeklyProblemDetail, {
            problems: weeklyProblems,
            fromDate: fromDate,
            toDate: toDate,
            onSubmit: () => {
                getWeeklyProblems()
            }
        })
    }

    const getSolverStatus = (solverCount) => {
        if (solverCount === 7) {
            return {text: "모두가 풀었습니다!!", className: styles.weeklyProblemsAllSolved}
        }
        if (solverCount === 0) {
            return {text: "아무도 풀지 않았습니다..", className: styles.weeklyProblemsNoneSolved}
        }
        return {text: `${solverCount}명이 풀었습니다`, className: styles.weeklyProblemsPartialSolved}
    }

    return (
        <section className={styles.problemsSection}>
            <div className={styles.problemsHeader}>
                <div className={styles.sectionTitle}>주간 문제</div>
                <button className={styles.addButton} onClick={openWeeklyProblemModal}>
                    문제 출제
                </button>
            </div>
            <div className={styles.weeklyProblemsContainer}>
                <div className={styles.weeklyProblemsGrid}>
                    {weeklyProblems && weeklyProblems.map((problem) => {
                        const status = getSolverStatus(problem?.solved_cnt)

                        return (
                            <div key={problem.id} className={styles.weeklyProblemsCard} onClick={() => {
                                window.open(`https://www.acmicpc.net/problem/${problem.problem_id}`, "_blank")
                            }}>
                                <div
                                    className={styles.weeklyProblemsAccentBar}
                                    style={{backgroundColor: DesignUtils.getTierColor(problem.level)}}
                                />
                                <div className={styles.weeklyProblemsHeader}>
                                    <div className={styles.weeklyProblemsInfo}>
                                        <span
                                            className={cm(styles.tierIcon, `${DesignUtils.getTierIconClass(problem.level)}`)}></span>
                                        {/*<TierIcon tier={problem.level} size="small" showText={true}/>*/}
                                        <h3 className={styles.weeklyProblemsTitle}>
                                            # {problem.problem_id} {problem.title}
                                        </h3>
                                    </div>
                                </div>

                                <div className={styles.weeklyProblemsSolverStatus}>
                                    <span className={`${styles.weeklyProblemsStatusBadge} ${status.className}`}>
                                      {status.text}
                                    </span>
                                </div>
                            </div>
                        )
                    })}

                    {weeklyProblems && weeklyProblems.length < 3 && (
                        <>
                            {Array.from({length: 3 - weeklyProblems.length}).map((_, index) => (
                                <div key={index} className={styles.weeklyProblemsEmptySlot} onClick={() => {
                                    openWeeklyProblemModal()
                                }}>
                                    <span className={styles.weeklyProblemsEmptyText}>문제를 출제해주세요</span>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </section>

    )
}