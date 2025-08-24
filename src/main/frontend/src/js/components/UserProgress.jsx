import styles from "../../css/styles.module.css";
import React, {useEffect, useState} from "react";
import {DesignUtils} from "../utils/DesignUtils";
import {cm} from "../setup/utils/cm"
import {MarkedProblemItem} from "./MarkedProblemItem";
import {useApi} from "../api/useApi";

export function UserProgress({fromDate, toDate}){
    const {userApi, problemApi} = useApi();

    const [users, setUsers] = useState([])
    const [problems, setProblems] = useState({})

    useEffect(() => {
        getAllUsers()
    }, []);

    useEffect(() => {
        getProblem();
        getWeeklyProblemSolved()
    }, [fromDate, toDate]);

    const getAllUsers = ()=>{
        userApi.getAllUsers(fromDate).then(({data})=>{
            if(data){
                // console.table(data)
                setUsers(data);
            }
            initLoad();
        })
    }

    const initLoad = ()=>{
        problemApi.loadBaekjoon().then(({data})=>{
            if(data){
                getProblem()
            }
        })
    }

    const getProblem = ()=> {
        const body = {
            from_date: fromDate,
            to_date: toDate,
            problem_id: -1,
        }

        problemApi.getProblem(body).then(({status, data}) => {
            const ob = {};
            // console.table(data)
            if(data){
                for(const detail of data){
                    ob[detail.id] = {
                        score: detail.score,
                        problems: JSON.parse(detail.problems)
                    }
                }
                setProblems(ob);
            }
        })
    }

    const getWeeklyProblemSolved = ()=>{
        problemApi.getWeeklyProblemSolved(fromDate).then(({data})=>{
            if(data){
                if(users){
                    const copy = [...users]
                    for(const user of copy){
                        user.shared_solved = data[user.id]
                    }
                    setUsers(copy)
                }
            }
        })
    }
    const getProgressPercentage = (current, target) => {
        if(current > target * 2){
            return 110
        }
        return Math.min((current / target) * 100, 100)
    }

    const getProgressBarColor = (current, target)=>{
        const per = getProgressPercentage(current, target)
        if(per > 100){
            return styles.p_over
        }else if(per === 100){
            return styles.p100
        }else if(per > 70){
            return styles.p70
        }else if(per > 30){
            return styles.p30
        }else if(per > 0){
            return styles.p10
        }
    }

    return (
        <section className={styles.progressSection}>
            <h2 className={styles.sectionTitle}>개별 진행 현황</h2>
            <div className={styles.userProgressContainer}>
                {users && users.map((user, i) => {
                    const problem = problems[user.id];
                    // console.table(problem)
                    const score = problem ? problem.score : 0;

                    const problemList = problem?.problems;
                    return (
                        <div key={i} className={cm(styles.userProgressCard, `${score >= 60 && styles.completed}`)}>
                            <div className={styles.userProgressAccent}
                                style={{backgroundColor: DesignUtils.getTierColor(user.tier)}}
                            />
                            <div className={styles.userProgressHeader}>
                                <div className={styles.userProgressInfo}>
                                    <span className={cm(styles.tierIcon, `${DesignUtils.getTierIconClass(user.tier)}`)}></span>
                                    {/*<TierIcon tier={user.tier} size="small"/>*/}
                                    <span className={styles.userProgressName}>{user.name}</span>
                                </div>
                                <span className={cm(styles.userProgressHotStreak, `${user.streak <= 0 && styles.cold}`)}></span>
                                <span className={cm(styles.userProgressHotStreakNumber)}>{user.streak > 0 && user.streak}</span>
                                {/*{renderStreakIcon(user.streak, user.lastWeekFailed)}*/}
                            </div>

                            <div className={styles.userProgressProgressContainer}>
                                <div className={styles.userProgressBar}>
                                    <div
                                        className={cm(styles.userProgressFill, `${getProgressBarColor(score, 60)}`)}
                                        style={
                                            {
                                                width: `${getProgressPercentage(score, 60)}%`
                                            }
                                    }
                                    />
                                </div>
                                <span className={styles.userProgressText}>
                                {score} / 60
                                    {
                                        problemList && <span style={{
                                            marginLeft: '6px',
                                            color: '#ababab'
                                        }}>({problemList.length}개)</span>
                                    }
                                </span>
                            </div>

                            <div className={styles.userProgressChallengeProblems}>
                                <div className={styles.userProgressProblemGrid}>
                                    {problemList && problemList.map((problem, index) => {
                                        return (
                                            <MarkedProblemItem key={index} problem={problem} index={index}/>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}