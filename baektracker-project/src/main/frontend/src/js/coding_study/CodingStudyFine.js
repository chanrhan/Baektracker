import Study from "../../css/study.module.css"
import React, {useEffect, useState} from "react";
import solvedAcApi from "../api/SolvedAcApi";

export function CodingStudyFine({date}){
    // const {solvedAcApi} = useApi()
    const [items, setItems] = useState([])
    const [totalFine, setTotalFine] = useState(0)

    useEffect(() => {
        console.log(date)
        getTotalFine()
    }, []);

    const getTotalFine = ()=>{
        solvedAcApi.getMonthFine(date).then(({data})=>{
            // console.table(data)
            if(data){
                setItems(data)
                let sum=0;
                for(const i of data){
                    sum += i.amount;
                }
                console.log(sum)
                setTotalFine(sum)
            }
        })
    }


    return (
        <div className={Study.study_fine}>
            {/*<button type='button' onClick={test}>TEST</button>*/}
            <p className={Study.title}>월별 벌금내역</p>
            <ul className={Study.fine_rank_list}>
                {
                    items && items.map((v,i)=>{
                        return (
                            <li className={Study.rank_item}>
                                <span className={cm(Study.span, Study.ranking_num)}>{v.ranking}</span>
                                <span className={cm(Study.span, Study.fine_name_text)}>{v.name}</span>
                                <span className={cm(Study.span, Study.fine_amount_num)}>{v.amount}원</span>
                                <span className={Study.fine_bar_panel}>
                                    <span className={Study.fine_bar}>
                                        <span className={Study.span}
                                              style={{
                                                  width: `${v.amount / totalFine * 100}%`,
                                                  // backgroundColor: "red"
                                              }}></span>
                                </span>
                                </span>


                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}