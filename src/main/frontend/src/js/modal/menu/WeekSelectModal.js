import Popup from "../../../css/popup.module.css"
import {useEffect, useRef, useState} from "react";
import {useRenderlessModal} from "../../setup/hook/useRenderlessModal";
import {DateUtils} from "../../setup/utils/DateUtils";
import {cm, cmc} from "../../setup/utils/cm";

export function WeekSelectModal({rootClassName, date, onSelect, children, errorText, blockCallback}){
    const renderlessModal = useRenderlessModal(`RDL_WEEK_SELECT_${onSelect}`)


    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [monthInfo, setMonthInfo] = useState()

    const [selectedWeek, setSelectedWeek] = useState({
        start: 0, end: 0
    })

    useEffect(() => {
        const _date = new Date(date);

        if(_date){
            setMonth(_date.getMonth()+1)
            setYear(_date.getFullYear())
            setMonthInfo(DateUtils.getMonthInfo(_date.getFullYear(), _date.getMonth()))

            setSelectedWeek({
                start: DateUtils.getFirstDateOfWeek(_date),
                end: DateUtils.getLastDateOfWeek(_date)
            })
            // console.table(selectedWeek)
        }
    }, [date]);

    const handleWeek = (day)=>{
        if(onSelect) onSelect(year, month-1, day)
        renderlessModal.close()
    }

    const setMonthNext = ()=>{
        if(month === 12){
            setMonthInfo(DateUtils.getMonthInfo(year+1, 0))
            setMonth(1);
            setYear(year+1)
        }else{
            setMonthInfo(DateUtils.getMonthInfo(year, month))
            setMonth(month+1);
        }
    }

    const setMonthPrev = ()=>{
        if(month === 1){
            setMonthInfo(DateUtils.getMonthInfo(year-1, 11))
            setMonth(12);
            setYear(year-1);
        }else{
            setMonthInfo(DateUtils.getMonthInfo(year, month-2))
            setMonth(month-1);
        }
    }

    return (
        <div onClick={renderlessModal.clickToOpen} className={`${rootClassName} ${errorText && cmc(Popup.error)}`} style={{
            position: 'relative'
        }}>
            {children}
            {
                errorText && <>
                    <p className='error_text'>{errorText}</p>
                </>
            }
            <div className={`${cm(Popup.date_popup, Popup.solo, `${renderlessModal.active && Popup.active}`)}`} ref={renderlessModal.ref}>
                <div className={Popup.date_head}>
                    <span className={Popup.span}>{year}년 {month}월</span>
                    <button type="button" className={cm(Popup.date_btn2, Popup.btn_prev2)} onClick={setMonthPrev}
                            disabled={!DateUtils.hasPrevMonth(year)}>이전
                    </button>
                    <button type="button" className={cm(Popup.date_btn2, Popup.btn_next2)} onClick={setMonthNext}
                            disabled={!DateUtils.hasNextMonth(year, month)}>다음
                    </button>
                </div>

                <div className={Popup.date_body}>
                    <table className={Popup.tb_date}>
                        <caption>달력</caption>
                        <colgroup>
                            <col span="6" style={{width: 'calc(100% / 7)'}}/>
                            <col/>
                        </colgroup>
                        <thead className={Popup.thead}>
                        <tr>
                            <th className={Popup.th} colSpan="col">일</th>
                            <th className={Popup.th} colSpan="col">월</th>
                            <th className={Popup.th} colSpan="col">화</th>
                            <th className={Popup.th} colSpan="col">수</th>
                            <th className={Popup.th} colSpan="col">목</th>
                            <th className={Popup.th} colSpan="col">금</th>
                            <th className={Popup.th} colSpan="col">토</th>
                        </tr>
                        </thead>
                        <tbody className={cm(Popup.tbody, Popup.week_calendar)}>
                        {
                            monthInfo && new Array(monthInfo.totalWeek).fill(0).map((v, week) => {
                                const firstWeekDay = (week * 7) + 1 - monthInfo.startDay + 1;
                                const fd = new Date(year, month-1, firstWeekDay);
                                const isWeekLine = DateUtils.equalYMd(selectedWeek.start, fd);

                                return <tr key={week} className={cm(Popup.tr)}
                                           >
                                    {
                                        new Array(7).fill(0).map((v, day) => {
                                            const d = (week * 7) + day - monthInfo.startDay + 1

                                            let isBlocked = false;
                                            let isBlockStart = false;
                                            let isBlockEnd = false;

                                            const curr_date = new Date(year, month-1, d);
                                            const isSelectedWeek =
                                                DateUtils.isAfterDate(curr_date, selectedWeek.start) &&
                                                DateUtils.isBeforeDate(curr_date, selectedWeek.end)

                                            let isWeekStart = false;
                                            let isWeekEnd = false;
                                            if(isSelectedWeek){
                                                isWeekStart = DateUtils.equalYMd(curr_date, selectedWeek.start)
                                                isWeekEnd = DateUtils.equalYMd(curr_date, selectedWeek.end)
                                            }

                                            if(blockCallback && blockCallback(year, month, d)){
                                                isBlocked = true;
                                                if(d === 1){
                                                    isBlockStart = true;
                                                }else{
                                                    if(d === monthInfo.totalDays){
                                                        isBlockEnd = true;
                                                    }else{
                                                        const diff = DateUtils.dateFromDiffYmdFromToday(year, month, d);
                                                        if(diff > -3 && diff <= 0){
                                                            isBlockEnd = true;
                                                        }
                                                    }

                                                }
                                            }
                                            return <DateItem key={day} today={DateUtils.isToday(year, month, d)}
                                                             day={(d > 0 && d <= monthInfo.totalDays) ? d : null}
                                                             onClick={handleWeek}
                                                             blocked={isBlocked} blockStart={isBlockStart} blockEnd={isBlockEnd}
                                                             selectedWeek={isSelectedWeek}
                                                             weekStart={isWeekStart} weekEnd={isWeekEnd}
                                            >
                                                {/*do something*/}
                                                {/*<span className="stat blue">전송완료 5건</span>*/}
                                            </DateItem>
                                        })
                                    }
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function DateItem({day, today, onClick, blocked, blockStart, blockEnd, selectedWeek, weekStart, weekEnd}) {
    return (
        <td className={cm(Popup.td, `${day == null && Popup.disable}`,
            `${selectedWeek && Popup.week_line}`, `${weekStart && Popup.week_start}`,`${weekEnd && Popup.week_end}`,
            `${today && Popup.today}`, `${blocked && Popup.blocked}`,`${blockStart && Popup.block_start}`,
            `${blockEnd && Popup.block_end}`)}>
            <button type='button' className={Popup.button} onClick={() => {
                if(day != null) {
                    onClick(day)
                }
            }} disabled={blocked}>{day}</button>
        </td>
    )
}