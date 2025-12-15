import styles from "../../css/styles.module.css";
import React, {useEffect, useState, useRef} from "react";
import {DesignUtils} from "../utils/DesignUtils";
import {cm} from "../setup/utils/cm"
import {MarkedProblemItem} from "./MarkedProblemItem";
import {useApi} from "../api/useApi";
import useModal from "../setup/hook/useModal";
import {getWindowFromNode} from "@testing-library/dom/dist/helpers";
import {ModalType} from "../setup/modal/ModalType";
import {MouseEventUtils} from "../setup/utils/MouseEventUtils";
import {DateUtils} from "../setup/utils/DateUtils";
import Popup from "../../css/popup.module.css";
import weeklyResultApi from "../api/weeklyResultApi";

export function UserProgress({fromDate, toDate}) {
    const modal = useModal()
    const {
        userApi,
        problemApi,
        weeklyResultApi
    } = useApi();

    const [users, setUsers] = useState([])
    const [problems, setProblems] = useState({})
    const [weeklyResults, setWeeklyResults] = useState({})
    const [openDropdownId, setOpenDropdownId] = useState(null)
    const dropdownRefs = useRef({})
    const threeDotsRefs = useRef({})
    const longPressTimer = useRef(null)

    useEffect(() => {
        getAllUsers()
    }, []);

    useEffect(() => {
        getProblem();
        getWeekPass()
        getWeeklyProblemSolved()
    }, [fromDate, toDate]);

    const getAllUsers = () => {
        userApi.getUsers().then(({data}) => {
            if (data) {
                // console.table(data)
                setUsers(data);
            }
            initLoad();
        })
    }

    const getWeekPass = () => {
        weeklyResultApi.getWeeklyResult(fromDate).then(({data}) => {
            const ob = {};

            if (data) {
                for (const item of data) {
                    if (item) {
                        ob[item.id] = {
                            state: Number(item.state)
                        }
                    }
                }
            }
            setWeeklyResults(ob)
        })
    }

    const initLoad = () => {
        problemApi.loadBaekjoon().then(({data}) => {
            if (data) {
                getProblem()
            }
        })
    }

    const getProblem = () => {
        const body = {
            from_date: fromDate,
            to_date: toDate,
            problem_id: -1,
        }

        problemApi.getProblem(body).then(({status, data}) => {
            const ob = {};
            // console.table(data)
            if (data) {
                for (const detail of data) {
                    ob[detail.id] = {
                        score: detail.score,
                        problems: JSON.parse(detail.problems)
                    }
                }
                setProblems(ob);
            }
        })
    }

    const getWeeklyProblemSolved = () => {
        problemApi.getWeeklyProblemSolved(fromDate).then(({data}) => {
            if (data) {
                if (users) {
                    const copy = [...users]
                    for (const user of copy) {
                        user.shared_solved = data[user.id]
                    }
                    setUsers(copy)
                }
            }
        })
    }
    const getProgressPercentage = (current, target) => {
        if (current > target * 2) {
            return 110
        }
        return Math.min((current / target) * 100, 100)
    }

    const getProgressBarColor = (current, target) => {
        const per = getProgressPercentage(current, target)
        if (per > 100) {
            return styles.p_over
        } else if (per === 100) {
            return styles.p100
        } else if (per > 70) {
            return styles.p70
        } else if (per > 30) {
            return styles.p30
        } else if (per > 0) {
            return styles.p10
        }
    }

    const getElementPosition = (element) => {
        if (!element) return null
        const rect = element.getBoundingClientRect()
        return {
            top: window.pageYOffset + rect.top,
            left: window.pageXOffset + rect.left
        }
    }

    const openGrantPassModal = (e, id) => {
        e.stopPropagation()
        const threeDotsButton = threeDotsRefs.current[id]
        if (threeDotsButton) {
            const pos = getElementPosition(threeDotsButton)
            if (pos) {
                modal.openModal(ModalType.MENU.Grant_Pass, {
                    id: id,
                    top: pos.top + threeDotsButton.offsetHeight + 4,
                    left: pos.left,
                    width: threeDotsButton.offsetWidth,
                    height: threeDotsButton.offsetHeight,
                    onSubmit: () => {
                        getAllUsers()
                    }
                })
            }
        }
        setOpenDropdownId(null)
    }

    const openUpdatePasswordModal = (e, id) => {
        e.stopPropagation()
        const threeDotsButton = threeDotsRefs.current[id]
        if (threeDotsButton) {
            const pos = getElementPosition(threeDotsButton)
            if (pos) {
                modal.openModal(ModalType.MENU.Update_Password, {
                    id: id,
                    top: pos.top + threeDotsButton.offsetHeight + 4,
                    left: pos.left,
                    width: threeDotsButton.offsetWidth,
                    height: threeDotsButton.offsetHeight
                })
            }
        }
        setOpenDropdownId(null)
    }

    const handleThreeDotsClick = (e, userId) => {
        e.stopPropagation()
        if (openDropdownId === userId) {
            setOpenDropdownId(null)
        } else {
            setOpenDropdownId(userId)
        }
    }

    const handleLongPressStart = (e, userId) => {
        longPressTimer.current = setTimeout(() => {
            setOpenDropdownId(userId)
        }, 500)
    }

    const handleLongPressEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
            longPressTimer.current = null
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropdownId && !event.target.closest(`[data-dropdown="${openDropdownId}"]`)) {
                setOpenDropdownId(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [openDropdownId])

    return (
        <section className={styles.progressSection}>
            <h2 className={styles.sectionTitle}>개별 진행 현황</h2>
            <div className={styles.userProgressContainer}>
                {users && users.map((user, i) => {
                    const problem = problems[user.id];
                    // console.table(problem)
                    const score = problem ? problem.score : 0;
                    const weeklyState = weeklyResults[user.id]?.state

                    const problemList = problem?.problems;
                    return (
                        <div key={i} className={cm(styles.userProgressCard, `${score >= 60 && styles.completed}`)}>
                            <div className={styles.userProgressAccent}
                                 style={{backgroundColor: DesignUtils.getTierColor(user.tier)}}
                            />
                            <div className={styles.userProgressHeader}>
                                <div className={styles.userProgressInfo}>
                                    <span
                                        className={cm(styles.tierIcon, `${DesignUtils.getTierIconClass(user.tier)}`)}></span>
                                    {/*<TierIcon tier={user.tier} size="small"/>*/}
                                    <span className={styles.userProgressName}>
                                        {user.name} {weeklyState === 2 ?
                                        <span className={styles.pass_text}>이번주 패스</span> : ''}
                                    </span>
                                    <div className={styles.userProgressMenuContainer} data-dropdown={user.id}>
                                        <button
                                            ref={(el) => threeDotsRefs.current[user.id] = el}
                                            className={styles.userProgressThreeDots}
                                            onClick={(e) => handleThreeDotsClick(e, user.id)}
                                            onTouchStart={(e) => handleLongPressStart(e, user.id)}
                                            onTouchEnd={handleLongPressEnd}
                                            onMouseDown={(e) => e.preventDefault()}
                                        >
                                            ⋯
                                        </button>
                                        {openDropdownId === user.id && (
                                            <div className={styles.userProgressDropdown}>
                                                <button
                                                    className={styles.userProgressDropdownItem}
                                                    onClick={(e) => openGrantPassModal(e, user.id)}
                                                >
                                                    패스
                                                </button>
                                                <button
                                                    className={styles.userProgressDropdownItem}
                                                    onClick={(e) => openUpdatePasswordModal(e, user.id)}
                                                >
                                                    비밀번호 수정
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span
                                    className={cm(styles.userProgressHotStreak, `${user.streak <= 0 && styles.cold}`)}></span>
                                <span
                                    className={cm(styles.userProgressHotStreakNumber)}>{user.streak > 0 && user.streak}</span>
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
