import React, {useEffect, useState} from 'react';
import { LayerModal } from "./LayerModal";
import Popup from "../../css/popup.module.css"
import useApi from "../setup/hook/useApi";
import {DateUtils} from "../setup/utils/DateUtils";
import {ObjectUtils} from "../setup/utils/ObjectUtil";
import {NumberUtils} from "../setup/utils/NumberUtils";

export function RecipeModal(props) {
    const {problemApi} = useApi()
    const today = new Date();
    const [date, setDate] = useState(today)
    const [weeklyData, setWeeklyData] = useState([])
    const [monthlyData, setMonthlyData] = useState([])
    const [monthlySum, setMonthlySum] = useState(0)
    const [totalData, setTotalData] = useState([])
    const [totalSum, setTotalSum] = useState(0)

    useEffect(() => {
        getTotalFine()
    }, []);

    useEffect(() => {
        getMonthFine()
        getWeeklyResult();
    }, [date]);

    const getTotalFine = ()=>{
        problemApi.getTotalFine().then(({data})=>{
            if(data){
                setTotalData(data)
                let sum = 0;
                for(const v of data){
                    sum += v.amount;
                }
                setTotalSum(sum)
            }
        })
    }

     const getMonthFine = ()=>{
         const date_str = DateUtils.dateToStringYYMM(date)
        problemApi.getMonthFine(date_str).then(({data})=>{
            if(data){
                setMonthlyData(data)
                let sum = 0;
                for(const v of data){
                    sum += v.amount;
                }
                setMonthlySum(sum)
            }
        })
     }

     const getWeeklyResult = ()=>{
         const date_str = DateUtils.dateToStringYYMM(date)
        problemApi.getWeeklyResult(date_str).then(({data})=>{
            // console.table(data)
            if(data){
                setWeeklyData(data)
            }
        })
     }


    const handlePrevMonth = ()=>{
        const newDate = new Date(date);
        DateUtils.subMonth(newDate, 1);
        setDate(newDate);
    }

    const handleNextMonth = ()=>{
        const newDate = new Date(date);
        DateUtils.addMonth(newDate, 1);

        setDate(newDate);
    }

    return (
        <LayerModal {...props} maxWidth={900} height={862} maxHeight={862} top={5} backgroundColor={`rgba(51, 54, 61, 0)`}>
            <div className={Popup.recipeModal}>
                {/* 메인 프레임 */}
                <div className={Popup.recipeModalMainFrame}>
                    {/* 헤더 섹션 */}
                    <div className={Popup.recipeModalHeaderSection}>
                        <div className={Popup.recipeModalHeaderContent}>
                            <button className={Popup.recipeModalNavButton}
                                    disabled={!DateUtils.isAfterDate(date, new Date('2025-07-09'))}
                                    onClick={handlePrevMonth}>
                                <div className={Popup.recipeModalPolygon}></div>
                            </button>
                            <div className={Popup.recipeModalMonthTitle}>{date.getFullYear()}년 {date.getMonth()+1}월 영수증</div>
                            <button className={Popup.recipeModalNavButton}
                                    disabled={!DateUtils.hasNextMonth(date.getFullYear(), date.getMonth()+1)}
                                    onClick={handleNextMonth}>
                                <div className={Popup.recipeModalPolygon}></div>
                            </button>
                        </div>
                    </div>

                    {/* 본문 섹션 */}
                    <div className={Popup.recipeModalBodySection}>
                        {/* 주간 레시피 섹션 */}
                        <div className={Popup.recipeModalWeeklyRecipesSection}>
                            <div className={Popup.recipeModalWeeklyRecipesContainer}>
                                {weeklyData && weeklyData.map((weekData, index) => {
                                    const list = JSON.parse(weekData.list)
                                    return (
                                        <div key={index} className={Popup.recipeModalRecipeCard}>
                                            <div className={Popup.recipeModalCardHeader}>
                                                <div className={Popup.recipeModalWeekTitle}>{weekData.week}주차</div>
                                            </div>
                                            <div className={Popup.recipeModalCardBody}>
                                                {list && list.map((v, i) => {
                                                    return (
                                                        <div key={i} className={Popup.recipeModalWeeklyCard}>
                                                            <div className={Popup.recipeModalMemberName}>{v.name}</div>
                                                            <div
                                                                className={Popup.recipeModalMemberScore}>{v.score}</div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            {/* 월별 금액 섹션 */}
                            <div className={Popup.recipeModalMonthlySection}>
                                <div className={Popup.recipeModalMonthlyTitle}>{date.getMonth()+1}월 금액 합계</div>
                                <div className={Popup.recipeModalMonthlyTotal}>{NumberUtils.toPrice(monthlySum)} 원</div>
                                <div className={Popup.recipeModalMonthlyList}>
                                    {monthlyData && monthlyData.map((item, i) => {
                                        if (item.amount <= 0) {
                                            return null;
                                        }
                                        return <div key={i} className={Popup.recipeModalMonthlyItem}>
                                            <div className={Popup.recipeModalItemName}>{item.name}</div>
                                            <div
                                                className={Popup.recipeModalItemAmount}>{item.amount.toLocaleString()} 원
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* 누적 금액 섹션 */}
                        <div className={Popup.recipeModalTotalSection}>
                            <div className={Popup.recipeModalTotalTitle}>누적 금액 합계</div>
                            <div className={Popup.recipeModalTotalAmount}>{NumberUtils.toPrice(totalSum)} 원</div>
                            <div className={Popup.recipeModalTotalList}>
                                {totalData && totalData.map((item, index) => {
                                    if(item.amount <= 0){
                                        return null;
                                    }
                                    return <div key={index} className={Popup.recipeModalTotalItem}>
                                        <div className={Popup.recipeModalItemName}>{item.name}</div>
                                        <div className={Popup.recipeModalItemAmount}>{item.amount.toLocaleString()} 원
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayerModal>
    );
} 