import styles from '../../css/styles.module.css'
import useApi from "../setup/hook/useApi";
import React, {useEffect, useState} from "react";
import {MouseEventUtils} from "../setup/utils/MouseEventUtils";
import Study from "../../css/study.module.css";
import {UserStatusCard} from "./UserStatusCard";

export default function PrivateSection({fromDate, toDate}) {
  const {problemApi} = useApi();
  const [problems, setProblems] = useState({})
  const [users, setUsers] = useState([])



  const [tooltip, setTooltip] = useState({
    visible: false, x: 0, y: 0, content: ''
  })

  useEffect(() => {
    getAllUsers()
  }, []);

  useEffect(() => {
    getProblem();
    getWeeklySharedSolved()
  }, [fromDate, toDate]);

  const initLoad = ()=>{
    problemApi.loadBaekjoon().then(({data})=>{
      // getAllUsers()
    })
  }

  const getAllUsers = ()=>{
    problemApi.getAllUsers(fromDate).then(({data})=>{
      if(data){
        // console.table(data)
        setUsers(data);
      }
      initLoad();
    })
  }

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
    problemApi.getProblem(body).then(({status, data}) => {
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
    problemApi.getWeeklySharedSolved(fromDate).then(({data})=>{
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
    <div className={styles.privateSection}>
      <div className={styles.privateContainer}>
        <div className={styles.teamStatusSection}>
          {/* Header */}
          <div className={styles.teamStatusHeaderContainer}>
            <div className={styles.teamStatusHeader}>
              <h2 className={styles.teamStatusTitle}>이번주 문제풀이 현황</h2>
            </div>
          </div>

          {/* Member Card */}
          <div className={styles.memberCardContainer}>
            {
                users && users.map((v,i)=>{
                  const id = v.id;
                  // console.log(id)
                  const pr = problems[id];

                  const score = pr ? pr.score : 0;
                  return <UserStatusCard key={i} id={id} level={v.tier} name={v.name} streak={v.streak}
                                         score={score} solvedList={pr && pr.problems} sharedSolved={v.shared_solved}/>
                })
            }
          </div>

        </div>
      </div>
      <Tooltip {...tooltip} />
    </div>
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