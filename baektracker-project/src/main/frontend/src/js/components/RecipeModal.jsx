import styles from "../../css/styles.module.css";
import React, {useEffect, useState} from "react";
import {LayerModal} from "../modal/LayerModal";
import useModal from "../setup/hook/useModal";
import {ModalType} from "../setup/modal/ModalType";
import useApi from "../setup/hook/useApi";
import {DateUtils} from "../setup/utils/DateUtils";

export function RecipeModal(props){
    const modal = useModal();
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

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Recipe)
    }
    return (
        <LayerModal {...props}>
            <div className={styles.modalOverlay}>
                <div className={styles.header}>
                    <h2 className={styles.title}>벌금 영수증</h2>
                    <button className={styles.closeButton} onClick={close}>
                        ✕
                    </button>
                </div>

                <div className={styles.content}>
                    <div className={styles.monthTabs}>
                        {/*{months.map((month) => (*/}
                        {/*    <button*/}
                        {/*        key={month}*/}
                        {/*        // className={`${styles.monthTab} ${selectedMonth === month ? styles.active : ""}`}*/}
                        {/*        // onClick={() => setSelectedMonth(month)}*/}
                        {/*    >*/}
                        {/*        {month}*/}
                        {/*    </button>*/}
                        {/*))}*/}
                    </div>

                    <div className={styles.summary}>
                        <div className={styles.totalAmount}>
                            <span className={styles.totalLabel}>전체 누적 벌금</span>
                            <span className={styles.totalValue}>₩{totalSum}</span>
                        </div>
                        <div className={styles.monthAmount}>
                            <span className={styles.monthLabel}>{7}월 벌금</span>
                            <span className={styles.monthValue}>₩{monthlySum}</span>
                        </div>
                    </div>

                    <div className={styles.userList}>
                        {weeklyData && weeklyData.map((weekData, index) => {
                            const list = JSON.parse(weekData.list)
                            return (
                                <div key={index} className={styles.userItem}>
                                    <div className={styles.userInfo}>
                                        <span className={styles.userName}>{weekData.name}</span>
                                        <span
                                            className={styles.userAmount}>₩{(weekData.amount)}</span>
                                    </div>
                                    <div className={styles.weekList}>
                                        {list && list.map((v, i) => (
                                            <span key={i} className={styles.weekBadge}>
                                              {v.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </LayerModal>
    )
}