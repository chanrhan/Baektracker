import Study from "../../css/study.module.css"
import React, {useEffect, useState} from "react";
import {CodingStudyProblem} from "./CodingStudyProblem";
import {CodingStudyUtils} from "./CodingStudyUtils";
import useApi from "../setup/hook/useApi";
import useModal from "../setup/hook/useModal";
import {DateUtils} from "../setup/utils/DateUtils";
import {ObjectUtils} from "../setup/utils/ObjectUtil";
import {ModalType} from "../setup/modal/ModalType";
import {WeekSelectModal} from "../modal/menu/WeekSelectModal";
import {cm} from "../setup/utils/cm";

const RESULT_COLOR = [
    0,0,0,0,
    '#ffffff', // (4) 맞았습니다!!
    '#ffffff', // (6) 출력 형식이 잘못되었습니다
    '#ffffff', // (7) 틀렸습니다
    '#ffffff', // (8) 시간 초과
    '#ffffff', // (9) 메모리 초과
    '#ffffff', // (10) 런타임 에러
    '#ffffff', // (11) 컴파일 에러
]

export function CodingStudyMain(){
    const {solvedAcApi} = useApi();
    const modal = useModal();
    const [tab, setTab] = useState(0)

    const today = new Date();
    const [users, setUsers] = useState([])

    const initFromDate = DateUtils.getFirstDateOfWeek(today);
    const initToDate = DateUtils.getLastDateOfWeek(today);
    const [fromDate, setFromDate] = useState(DateUtils.dateToStringYYMMdd(initFromDate));
    const [toDate, setToDate] = useState(DateUtils.dateToStringYYMMdd(initToDate));

    const [isLoading, setIsLoading] = useState(false)

    const [sharedProblems, setSharedProblems] = useState([]);
    const [editMode, setEditMode] = useState(false)

    const [sharedProblemInputs, setSharedProblemInputs] = useState([-1, -1, -1])
    const [orgSp, setOrgSp] = useState([-1,-1]);

    useEffect(() => {
        getSharedProblems();
        getAllUsers()
    }, []);

    useEffect(() => {
        setEditMode(false)
    }, [fromDate, toDate]);

    const initLoad = ()=>{
        solvedAcApi.loadBaekjoon().then(({data})=>{
            // getAllUsers()
        })
    }

    const getSharedProblems = ()=>{
        solvedAcApi.getSharedProblem(fromDate).then(({status,data})=>{
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


    const getAllUsers = ()=>{
        solvedAcApi.getAllUsers(fromDate).then(({data})=>{
            if(data){
                // console.table(data)
                setUsers(data);
            }
            initLoad();
        })
    }

    const setWeekDates = (date: Date)=>{
        // if(!DateUtils.isBeforeDate(date, today)){
        //     return;
        // }
        const fd = DateUtils.getFirstDateOfWeek(date);
        const td = DateUtils.getLastDateOfWeek(date);
        setFromDate(DateUtils.dateToStringYYMMdd(fd))
        setToDate(DateUtils.dateToStringYYMMdd(td))
    }




    const handlePrevWeek = ()=>{
        const newDate = new Date(fromDate);
        DateUtils.subDate(newDate, 7);
        setWeekDates(newDate);
    }

    const handleNextWeek = ()=>{
        const newDate = new Date(fromDate);
        DateUtils.addDate(newDate, 7);

        setWeekDates(newDate);
    }

    const handleWeek = (year, month, day)=>{
        const dt = new Date(year, month, day);
        setWeekDates(dt);
    }

    const showEditButton = ()=>{
        const p = DateUtils.dateDiff(DateUtils.getFirstDateOfWeek(today), new Date(fromDate));
        // console.log(p)
        if(p < -7){
            // setEditMode(false)
            return false;
        }
        return true;
    }

    const handleEditMode = ()=>{
        if(!showEditButton()){
            return;
        }
        const curr_state = editMode;
        setEditMode(!editMode)
        if(curr_state){
            const body = []
            if(sharedProblemInputs[0] != -1 && sharedProblemInputs[0] != orgSp[0]){
                body.push(sharedProblemInputs[0])
            }
            if(sharedProblemInputs[1] != -1 && sharedProblemInputs[1] != orgSp[1]){
                body.push(sharedProblemInputs[1])
            }
            if(sharedProblemInputs[2] != -1 && sharedProblemInputs[2] != orgSp[2]){
                body.push(sharedProblemInputs[2])
            }
            console.table(body)
            if(ObjectUtils.isEmptyArray(body)){
                return;
            }
            solvedAcApi.updateSharedProblem(fromDate, sharedProblemInputs).then(({data})=>{
                if(data){
                    modal.openModal(ModalType.SNACKBAR.Info, {
                        msg: "공통문제가 변경되었습니다."
                    })
                }
                getSharedProblems()
                getAllUsers()
            })

        }
    }

    return (
        <div className={Study.service_cont}>
            <div className={Study.option_header}>
                <div className={Study.date_panel}>
                    <button className={Study.btn_prev_date} onClick={handlePrevWeek}></button>
                    <div className={Study.selected_date_text}>
                        {fromDate} ~ {toDate}
                        <div className={Study.btn_box}>
                            <button type='button' className={Study.btn_today} onClick={() => {
                                setWeekDates(today)
                            }}>오늘
                            </button>
                            <WeekSelectModal rootClassName={Study.btn_week_date} date={fromDate}
                                             onSelect={handleWeek}>
                                날짜 선택
                            </WeekSelectModal>
                        </div>

                    </div>
                    <button className={Study.btn_next_date} onClick={handleNextWeek}></button>
                </div>
                <div className={Study.loading_panel}>
                    {isLoading && "데이터를 가져오는 중입니다.."}
                </div>
                <div className={Study.shared_problem_box}>
                    {
                        new Array(3).fill(0).map((_, i) => {
                            const v = sharedProblems[i];
                            return (
                                <div className={Study.shared_problem_item} style={{
                                    backgroundColor: `${CodingStudyUtils.getTierColor(v?.level)}`
                                }} onClick={() => {
                                    if (v && !editMode) {
                                        window.open(`https://www.acmicpc.net/problem/${v.problem_id}`, "_blank")
                                }
                                }}>
                                    {
                                        !editMode ? (
                                            <>
                                                <div className={Study.problem_info_box}>
                                                        <span
                                                            className={cm(Study.level_icon, CodingStudyUtils.getLevelIconClass(v?.level))}></span>
                                                    <span
                                                        className={Study.problem_id_text}>{v?.problem_id ?? ''}</span>
                                                </div>
                                                <div className={Study.title_box}>
                                                    <span className={Study.title}>{v?.title ?? "없음"}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className={Study.edit_box}>
                                                <input type="text" placeholder='problem id'
                                                       className={Study.inp_problem_id}
                                                       value={sharedProblemInputs[i]}
                                                       onChange={e => {
                                                           const copy = [...sharedProblemInputs];
                                                           copy[i] = e.target.value;
                                                           setSharedProblemInputs(copy);
                                                       }}/>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                    <button type='button' className={cm(Study.btn_modify, `${editMode && Study.edit}`)}
                            onClick={handleEditMode}>
                        {showEditButton() ? editMode ? '적용' : '수정' : '-'}
                    </button>
                </div>
            </div>
            <CodingStudyProblem fromDate={fromDate} toDate={toDate} users={users} setUsers={setUsers}/>
        </div>
)
}
