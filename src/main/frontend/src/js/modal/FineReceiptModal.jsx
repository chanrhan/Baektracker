import React, {useEffect, useState} from "react"
import styles from "../../css/styles.module.css"
import {LayerModal} from "./LayerModal";
import {DateUtils} from "../setup/utils/DateUtils";
import {cm} from "../setup/utils/cm";
import useModal from "../setup/hook/useModal";
import {ModalType} from "../setup/modal/ModalType";
import {useApi} from "../api/useApi";

export function FineReceiptModal(props) {
    const modal = useModal()
    const {weeklyResultApi} = useApi()
    const today = new Date();
    const [date, setDate] = useState(today)
    // const [weeklyData, setWeeklyData] = useState([])
    const [monthlyData, setMonthlyData] = useState([])
    const [monthlySum, setMonthlySum] = useState(0)
    const [totalData, setTotalData] = useState([])
    const [totalSum, setTotalSum] = useState(0)
    const [fold, setFold] = useState(true)

    useEffect(() => {
        getTotalFine()
    }, []);

    useEffect(() => {
        getMonthFine()
        // getWeeklyResult();
    }, [date]);

    const getTotalFine = () => {
        weeklyResultApi.getTotalFine().then(({data}) => {
            if (data) {
                setTotalSum(data.totalFine)
                setTotalData(data.items);

            }
        })
    }

    const getMonthFine = () => {
        const date_str = DateUtils.dateToStringYYMM(date)
        weeklyResultApi.getMonthFine(date_str).then(({data}) => {
            if (data) {
                setMonthlySum(data.sum)
                if (data.user_list) {
                    const list = JSON.parse(data.user_list);
                    setMonthlyData(list);
                }
            }
        })
    }

    // const getWeeklyResult = ()=>{
    //   const date_str = DateUtils.dateToStringYYMM(date)
    //   weeklyResultApi.getWeeklyResult(date_str).then(({data})=>{
    //     // console.table(data)
    //     if(data){
    //       setWeeklyData(data)
    //     }
    //   })
    // }


    const handlePrevMonth = () => {
        const newDate = new Date(date);
        DateUtils.subMonth(newDate, 1);
        setDate(newDate);
    }

    const handleNextMonth = () => {
        const newDate = new Date(date);
        DateUtils.addMonth(newDate, 1);

        setDate(newDate);
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("ko-KR").format(amount)
    }

    const close = () => {
        modal.closeModal(ModalType.LAYER.Recipe)
    }

    return (
        <LayerModal {...props} maxWidth={500} maxHeight={800} top={25}>
            <div className={styles.receiptModalHeader}>
                <h2 className={styles.receiptModalTitle}>벌금 영수증</h2>
                <button className={styles.receiptModalCloseButton} onClick={close}>
                    ✕
                </button>
            </div>

            <div className={styles.receiptModalContent}>
                <div className={styles.receiptModalMonthTabs}>
                    <button className={styles.weekSelectorNavButton} onClick={handlePrevMonth}>
                        ←
                    </button>
                    <button className={styles.weekSelectorWeekButton}>
                        {date.getFullYear()}년 {date.getMonth() + 1}월
                    </button>
                    <button className={styles.weekSelectorNavButton} onClick={handleNextMonth}>
                        →
                    </button>
                </div>

                <div className={styles.receiptModalSummary}>
                    <div className={styles.receiptModalTotalAmount}>
                        <div className={styles.total_fine_section}>
                            <span className={styles.receiptModalTotalLabel}>전체 누적 벌금</span>
                            <span className={styles.receiptModalTotalValue}>₩{formatCurrency(totalSum)}</span>
                        </div>
                        <div className={cm(styles.fold_section, `${!fold && styles.opened}`)}>
                            <button type='button' className={cm(styles.btn_fold)} onClick={() => {
                                setFold(!fold)
                            }}>
                            </button>
                            <div className={styles.opened_user_list}>
                                {
                                    totalData && totalData.map((v, i) => {
                                        return (
                                            <div className={styles.receiptModalUserInfo}>
                                                <span className={styles.receiptModalUserName}>{v.name}</span>
                                                <span
                                                    className={styles.receiptModalUserAmount}>₩{formatCurrency(v.amount)}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className={styles.receiptModalMonthAmount}>
                        <span className={styles.receiptModalMonthLabel}>{date.getMonth() + 1}월 벌금</span>
                        <span className={styles.receiptModalMonthValue}>₩{formatCurrency(monthlySum)}</span>
                    </div>
                </div>

                <div className={styles.receiptModalUserList}>
                    {monthlyData && monthlyData.map((user, index) => {
                        if (user.amount <= 0) {
                            return null
                        }
                        return (
                            <div key={index} className={styles.receiptModalUserItem}>
                                <div className={styles.receiptModalUserInfo}>
                                    <span className={styles.receiptModalUserName}>{user.name}</span>
                                    <span
                                        className={styles.receiptModalUserAmount}>₩{formatCurrency(user.amount)}</span>
                                </div>
                                <div className={styles.receiptModalWeekList}>
                                    {user.week_list && user.week_list.sort().map((week) => {
                                        if (week < 0) {
                                            return null;
                                        }
                                        return (
                                            <span key={week} className={styles.receiptModalWeekBadge}>
                            {week}주차
                          </span>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </LayerModal>

    )
}
