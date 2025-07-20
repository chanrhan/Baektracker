import Study from "../../css/study.module.css";
import React, {useEffect, useState} from "react";
import {DesignUtils} from "./DesignUtils";
import useApi from "../setup/hook/useApi";
import {MouseEventUtils} from "../setup/utils/MouseEventUtils";
import {cm} from "../setup/utils/cm";

export function CodingStudyProblem({fromDate, toDate, users, setUsers}){
    const {solvedAcApi} = useApi();
    const [problems, setProblems] = useState({})


    const [tooltip, setTooltip] = useState({
        visible: false, x: 0, y: 0, content: ''
    })

    useEffect(() => {
        getProblem();
        getWeeklySharedSolved()
    }, [fromDate, toDate]);

    const getProblem = ()=> {
        // setIsLoading(true)
        const body = {
            // usernames: INIT_USERNAMES,
            from_date: fromDate,
            to_date: toDate,
            problem_id: -1,
            // result_id: -1
        }
        // console.table(body)
        solvedAcApi.getProblem(body).then(({status, data}) => {
            const ob = {};
            if(data){
                for(const detail of data){
                    ob[detail.id] = {
                        score: detail.score,
                        problems: JSON.parse(detail.problems)
                    }
                }
                // console.table(ob)
                setProblems(ob);
            }
            // console.table(data)
            // setIsLoading(false)
        })
    }


    const getWeeklySharedSolved = ()=>{
        solvedAcApi.getWeeklySharedSolved(fromDate).then(({data})=>{
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


    const onBarMouseMove = (e, title, co_solvers) => {
        const pos = MouseEventUtils.getAbsolutePos(e);
        const rect = e.currentTarget.getBoundingClientRect();
        const y_offset = co_solvers ? 24 : 0
        setTooltip({
            visible: true,
            x: pos.left,
            y: pos.top - (rect.height * 1.4) - y_offset,
            content: title,
            co_solvers: co_solvers
        });
    };

    const onBarMouseLeave = () => {
        setTooltip(t => ({ ...t, visible: false }));
    };

    return (
        <>
            <div className={Study.study_cont}>
                <div className={Study.detail_list}>
                    {
                        users && users.map((user, i) => {
                            const id = user.id;
                            // console.log(id)
                            const pr = problems[id];

                            const score = pr ? pr.score : 0;
                            const per = (score >= 60) ? 100 : Math.floor((Number)(score / 60) * 100);

                            return (
                                <div className={Study.detail_item}>
                                    <div className={Study.user_info_box} style={{
                                        backgroundColor: `${DesignUtils.getTierColor(user.tier)}`
                                    }}>
                                        <div className={Study.info_detail_box}>
                                            <span className={Study.fire_icon}></span>
                                            <span
                                                className={cm(Study.level_icon, DesignUtils.getTierIconClass(user.tier))}></span>
                                            {
                                                user.shared_solved ?
                                                    <span className={cm(Study.shared_status)}></span> : null
                                            }
                                        </div>
                                        <div className={Study.username_box}>
                                            <span className={Study.username_text}>{user.name}</span>
                                        </div>
                                        <div className={Study.shared_solved_text}>
                                            <span className={Study.total_count_icon}>{user.solved_count}</span> 문제 해결

                                        </div>
                                    </div>
                                    <div className={Study.week_progress_box}>
                                        <div className={Study.progress_bar_box}>
                                            <div className={Study.bg_bar}>
                                                {
                                                    user && (
                                                        <>
                                                                    <span className={Study.span}
                                                                          style={{
                                                                              width: `${per}%`,
                                                                              backgroundColor: `${DesignUtils.getBarColor(per)}`
                                                                          }}></span>
                                                        </>
                                                    )
                                                }
                                            </div>
                                            <div className={cm(Study.progress_text, Study.per)}>{per}%</div>
                                            <div className={cm(Study.progress_text, Study.num)}>({score} / 60)</div>
                                        </div>
                                        <div className={Study.problem_detail_box}>
                                            {/*<span className={Study.description}>채점 현황</span>*/}
                                            <div className={Study.problem_list}>
                                                {
                                                    pr && pr.problems && pr.problems.map((p, pi) => {
                                                        return (
                                                            <div className={Study.problem_item} style={{
                                                                backgroundColor: `${DesignUtils.getResultColor(p.result_id)}`
                                                            }}
                                                                 onMouseMove={e => onBarMouseMove(e, p.title, p.co_solvers)}
                                                                 onMouseLeave={onBarMouseLeave} onClick={() => {
                                                                // console.log(p.level)
                                                                window.open(`https://www.acmicpc.net/problem/${p.problem_id}`, "_blank")
                                                            }}>
                                                                        <span
                                                                            className={cm(Study.level_icon, DesignUtils.getLevelIconClass(p.level))}></span>
                                                                <span
                                                                    className={Study.problem_num}>{p.problem_id}</span>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Tooltip {...tooltip} />
        </>
    )
}


function Tooltip({visible, x, y, content, co_solvers}) {
    if (!visible) return null;
    return (
        <div className={Study.tooltip} style={{left: x, top: y}}>
            {content}
            {
                co_solvers && co_solvers.length > 0 && (
                    <div className={Study.co_solvers}>solved: {
                        co_solvers.map((v, i) => {
                            if (i < co_solvers.length - 1) {
                                return `${v}, `
                            }
                            return `${v}`
                        })
                    }</div>
                )
            }
        </div>
    );
}