import {Link, Outlet, useNavigate} from "react-router-dom";
import Study from "../../css/study.module.css";
import React, {useEffect, useState} from "react";
import useApi from "../setup/hook/useApi";
import {cm} from "../setup/utils/cm";

export function CodingStudyLayout(){
    const {solvedAcApi} = useApi();
    const pathname = window.location.pathname
    const [tab, setTab] = useState(0)
    const [fineItem, setFineItem] = useState([])
    const [totalFine, setTotalFine] = useState(0)

    useEffect(() => {
        switch (pathname){
            case "/study":
                setTab(0)
                break
            case "/study/fine":
                setTab(1)
                break
        }
        getTotalFine();
    }, []);

    const getTotalFine = ()=>{
        solvedAcApi.getTotalFine().then(({data})=>{
            if(data){
                setFineItem(data)
                let sum=0;
                for(const i of data){
                    sum += i.amount;
                }
                // console.log(sum)
                setTotalFine(sum)
            }
        })
    }

    return (
        <div>
            <div className={Study.study_main}>
                <div className={Study.study_header}>
                    <div className={Study.title}>
                        코테스터디(이름추천받아요) (06/09~)
                        <span className={Study.description}>새싹: 10점 / 브론즈: 20점 / 실버: 30점 / 골드: 50점 / 플레 이상: 80점</span>
                    </div>
                </div>

                <div className={Study.study_body}>
                    <div className={Study.study_sidebar}>
                        <div className={Study.total_fine_panel}>
                            <div className={Study.title}>총 벌금</div>
                            <span className={Study.total_fine_text}>( {totalFine}원 )</span>
                            <div className={Study.total_fine_list}>
                                {
                                    fineItem && fineItem.map((v,i)=>{
                                        return (
                                            <div className={Study.total_fine_item}>
                                                <div className={Study.ranking_num}>{v.ranking}</div>
                                                <div className={Study.info_box}>
                                                    <div className={Study.top_panel}>
                                                        <span className={Study.username_text}>{v.name}</span>
                                                        <span className={Study.fine_num}>{v.amount}</span>
                                                    </div>
                                                    <div className={Study.bottom_panel}>
                                                        <span className={Study.bg_bar2}>
                                                            <span className={Study.span} style={{
                                                                width: `${v.amount / totalFine * 100}%`,
                                                                // backgroundColor: "red"
                                                            }}></span>
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {/*<Link className={cm(Study.side_menu_item, `${tab === 0 && Study.active}`)} to="/study">*/}
                        {/*    문제 현황*/}
                        {/*</Link>*/}
                        {/*<Link className={cm(Study.side_menu_item, `${tab === 1 && Study.active}`)} to="/study/fine">*/}
                        {/*    벌금 현황*/}
                        {/*</Link>*/}
                    </div>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}