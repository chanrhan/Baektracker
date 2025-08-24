import styles from "../../css/styles.module.css";
import React, {useEffect, useState} from "react";
import useModal from "../setup/hook/useModal";
import {DateUtils} from "../setup/utils/DateUtils";
import {ModalType} from "../setup/modal/ModalType";
import {NumberUtils} from "../setup/utils/NumberUtils";
import {WeekSelectModal} from "../modal/menu/WeekSelectModal";
import {useApi} from "../api/useApi";

export function Header({fromDate, toDate, setFromDate, setToDate}){
    const {weeklyResultApi} = useApi();
    const today = new Date();

    const modal = useModal();

    const [totalFine, setTotalFine] = useState(0)
    useEffect(() => {
        getTotalFine()
    }, []);

    const getTotalFine = ()=>{
        weeklyResultApi.getTotalFine().then(({data})=>{
            if(data){
                setTotalFine(data.sum)
            }
        })
    }

    const setWeekDates = (date: Date)=>{
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

    const openRecipeModal = ()=>{
        modal.openModal(ModalType.LAYER.Recipe, {

        })
    }

    return (
        <header className={styles.header}>
            <span className={styles.title}>Baektracker</span>
            <div className={styles.weekSelectorContainer}>
                <div className={styles.weekSelectorNavigation}>
                    <button className={styles.weekSelectorNavButton} onClick={handlePrevWeek}>
                        ←
                    </button>
                    <WeekSelectModal rootClassName={styles.weekSelectorWeekButton} date={fromDate}
                                     onSelect={handleWeek}>
                        {fromDate} ~ {toDate}
                    </WeekSelectModal>
                    {/*<button className={styles.weekSelectorWeekButton} onClick={openWeekCalendarModal}>*/}
                    {/*    */}
                    {/*</button>*/}
                    <button className={styles.weekSelectorNavButton} onClick={handleNextWeek}>
                        →
                    </button>
                </div>
                <button className={styles.weekSelectorTodayButton} onClick={()=>{
                    setWeekDates(today)
                }}>
                    오늘
                </button>
            </div>
            <div className={`${styles.fineInfoContainer}`}>
                <div className={styles.fineInfoAmount}>
                    <span className={styles.fineInfoLabel}>누적 벌금</span>
                    <span className={styles.fineInfoAmountText}>{NumberUtils.toPrice(totalFine)}원</span>
                </div>
                <button className={styles.fineInfoReceiptButton} onClick={openRecipeModal}>
                    영수증 보기
                </button>
            </div>
        </header>
    )
}

// FineInfo 컴포넌트
const FineInfo = ({totalFine, onShowReceipt, className}) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("ko-KR").format(amount)
    }

    return (
        <div className={`${styles.fineInfoContainer} ${className || ""}`}>
            <div className={styles.fineInfoAmount}>
                <span className={styles.fineInfoLabel}>누적 벌금</span>
                <span className={styles.fineInfoAmountText}>₩{formatCurrency(totalFine)}</span>
            </div>
            <button className={styles.fineInfoReceiptButton} onClick={onShowReceipt}>
                영수증 보기
            </button>
        </div>
    )
}