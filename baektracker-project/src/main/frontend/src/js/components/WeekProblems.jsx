import styles from "../../css/styles.module.css";
import React, {useEffect, useState} from "react";
import {TierIcon} from "./TierIcon";
import useApi from "../setup/hook/useApi";
import useModal from "../setup/hook/useModal";
import {DateUtils} from "../setup/utils/DateUtils";
import {ModalType} from "../setup/modal/ModalType";
import {DesignUtils} from "../utils/DesignUtils";
import {cm} from "../setup/utils/cm";
// WeeklyProblems 컴포넌트

export function WeekProblems({fromDate, toDate}){
    const {problemApi} = useApi();
    const modal = useModal();
    const today = new Date();

    const [sharedProblems, setSharedProblems] = useState([]);
    const [editMode, setEditMode] = useState(false)

    const [sharedProblemInputs, setSharedProblemInputs] = useState([-1, -1, -1])
    const [orgSp, setOrgSp] = useState([-1,-1]);

    useEffect(() => {
        getSharedProblems();
    }, [fromDate, toDate]);

    const getSharedProblems = ()=>{
        problemApi.getSharedProblem(fromDate).then(({status,data})=>{
            // console.table(data)
            if(data){
                const copy = [...sharedProblemInputs];
                for(const i in data){
                    copy[i] = data[i].problem_id
                }
                setSharedProblemInputs(copy);
                setSharedProblems(data);
                setOrgSp(copy);
            }
        })
    }

    const openSharedProblemModal = ()=>{
        modal.openModal(ModalType.LAYER.SharedProblemDetail, {
            problems: sharedProblems,
            date: fromDate,
            onSubmit: ()=>{
                getSharedProblems()
            }
        })
    }

    const getSolverStatus = (solverCount) => {
        if (solverCount === 7) {
            return { text: "모두가 풀었습니다!!", className: styles.weeklyProblemsAllSolved }
        }
        if (solverCount === 0) {
            return { text: "아무도 풀지 않았습니다..", className: styles.weeklyProblemsNoneSolved }
        }
        return { text: `${solverCount}명이 풀었습니다`, className: styles.weeklyProblemsPartialSolved }
    }

    return (
        <section className={styles.problemsSection}>
            <div className={styles.problemsHeader}>
                <div className={styles.sectionTitle}>주간 문제</div>
                <button className={styles.addButton} onClick={openSharedProblemModal}>
                    문제 출제
                </button>
            </div>
            <div className={styles.weeklyProblemsContainer}>
                <div className={styles.weeklyProblemsGrid}>
                    {sharedProblems && sharedProblems.map((problem) => {
                        const status = getSolverStatus(problem?.solved_cnt)

                        return (
                            <div key={problem.id} className={styles.weeklyProblemsCard} onClick={()=>{
                                window.open(`https://www.acmicpc.net/problem/${problem.problem_id}`, "_blank")
                            }}>
                                <div
                                    className={styles.weeklyProblemsAccentBar}
                                    style={{backgroundColor: DesignUtils.getTierColor(problem.level)}}
                                />
                                <div className={styles.weeklyProblemsHeader}>
                                    <div className={styles.weeklyProblemsInfo}>
                                        <span className={cm(styles.tierIcon, `${DesignUtils.getTierIconClass(problem.level)}`)}></span>
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

                    {sharedProblems && sharedProblems.length < 3 && (
                        <>
                            {Array.from({length: 3 - sharedProblems.length}).map((_, index) => (
                                <div key={index} className={styles.weeklyProblemsEmptySlot} onClick={()=>{
                                    openSharedProblemModal()
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