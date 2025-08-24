import {cm} from "../../../utils/cm";
import Calender from "../../../../css/calendar.module.css";
import {useEffect, useRef, useState} from "react";
import {DateUtils} from "../../../utils/DateUtils";
import useModal from "../../../hook/useModal";
import {useRenderlessModal} from "../../../hook/useRenderlessModal";

export function MonthSelectModal({className, onSelect, children}){
    const renderlessModal = useRenderlessModal(`RDL_MONTH_SELECT_${onSelect}`)

    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());


    const select = (month)=>{
        if(onSelect) onSelect(year,month);
        renderlessModal.close()
    }

    const nextYear = (e)=>{
        setYear(year+1)
    }

    const prevYear = (e)=>{
        setYear(year-1)
    }

    return (
        <div className={className} style={{
            display: "inline-block",
            position: "relative",
            zIndex: 100
        }} onClick={renderlessModal.clickToOpen}>
            {children}
            <div className={cm(Calender.date_popup, `${renderlessModal.active && Calender.active}`)} ref={renderlessModal.ref}>
                <div className={Calender.popup_control}>
                    <span className={Calender.popup_year}>{year}년</span>
                    <button type="button" className={cm(Calender.control_btn, Calender.btn_prev)} onClick={prevYear}>이전</button>
                    <button type="button" className={cm(Calender.control_btn, Calender.btn_next)} onClick={nextYear} disabled={!DateUtils.hasNextYear(year)}></button>
                </div>
                <ul className={Calender.popup_list}>
                    {
                        new Array(12).fill(0).map((_, i) => {
                            return <li key={i} className={Calender.popup_item}>
                                <button type="button" className={Calender.popup_btn} onClick={()=>{
                                    select(i+1)
                                }}>{i + 1}월</button>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}