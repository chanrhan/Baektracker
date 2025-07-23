import {LayerModal} from "./LayerModal";
import styles from "../../css/styles.module.css";
import {EditableSharedProblemCard} from "../components/EditableSharedProblemCard";
import {useEffect, useState} from "react";
import useApi from "../setup/hook/useApi";
import {cm} from "../setup/utils/cm";
import {DesignUtils} from "../utils/DesignUtils";
import useModal from "../setup/hook/useModal";
import {ModalType} from "../setup/modal/ModalType";

export function SharedProblemDetailModal(props){
    const modal = useModal();
    const {problemApi} = useApi()
    const [items, setItems] = useState(props.problems ? [...props.problems] : [])

    const [keyword, setKeyword] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const searchProblems = ()=>{
        problemApi.getProblemInfoList(keyword).then(({data})=>{
            // console.table(data)
            if(data){
                setSearchResults(data);
            }
        })
    }

    const addProblem = (index, id)=>{
        if(items.length >= 3){

            return;
        }
        const item = {
            problem_id: id,
            level: searchResults[index].level,
            title: searchResults[index].title
        }
        const copy = [...items];
        copy.push(item)
        setItems(copy);
    }

    const deleteProblem = (index)=>{
        const copy = [...items];
        copy.splice(index, 1);
        setItems(copy);
    }


    const submit = ()=>{
        if(props.onSubmit){
            props.onSubmit();
        }
        modal.closeModal(ModalType.LAYER.SharedProblemDetail)
    }

    const cancel = ()=>{
        modal.closeModal(ModalType.LAYER.SharedProblemDetail)
    }

    return (
        <LayerModal {...props} maxWidth={1000} height={800} maxHeight={1400} top={5} backgroundColor={`rgba(51, 54, 61, 0)`}>
            <div className={styles.sharedProblemManageModal}>
                {/* 메인 프레임 */}
                <div className={styles.modalMainFrame}>
                    {/* 헤더 섹션 */}
                    <div className={styles.modalHeaderContainer2}>
                        <div className={styles.modalHeaderSection}>
                            <div className={styles.modalDateText}>2025-07-14 ~ 2025-07-21</div>
                            <div className={styles.modalTitleText}>최대 3개의 주간 공통 문제를 등록해주세요</div>
                        </div>
                        <div className={styles.btn_section}>
                            <button type='button' className={cm(styles.btn_cancel, styles.btn)} onClick={cancel}>취소</button>
                            <button type='button' className={cm(styles.btn_submit, styles.btn)} onClick={submit}>저장</button>
                        </div>
                    </div>

                    {/* 본문 섹션 */}
                    <div className={styles.modalBodySection}>
                        {/* 문제 카드 섹션 */}
                        <div className={styles.problemCardsSection}>
                            {/* 문제 카드 1 */}
                            {
                                [1,2,3].map((v,i)=>{
                                    const item = items[i];
                                    console.table(item)
                                    return <EditableSharedProblemCard key={i} level={item?.level}
                                                                      id={item?.problem_id} title={item?.title}
                                                                      onClick={()=>{
                                                                          deleteProblem(i)
                                    }}/>
                                })
                            }
                        </div>

                        {/* 검색/관리 섹션 */}
                        <div className={styles.searchManageSection}>
                            <div className={styles.searchContainer}>
                                <div className={styles.searchHeader}>
                                    <input className={styles.searchInputFrame} value={keyword}
                                           placeholder='문제를 검색해주세요'
                                            onKeyPress={e=>{
                                                if(e.which === 13) {
                                                    searchProblems()
                                                }
                                            }}
                                           onChange={e=>{
                                        setKeyword(e.target.value)
                                    }}/>
                                </div>
                                <div className={styles.searchResultsArea}>
                                    <table className={styles.tableHeader}>
                                        <colgroup>
                                            <col width='20%'/>
                                            <col width='20%'/>
                                            <col width='60%'/>
                                        </colgroup>
                                        <thead className={styles.thead}>
                                            <tr className={styles.tr}>
                                                <th>번호</th>
                                                <th>레벨</th>
                                                <th>제목</th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div className={styles.tableBodyContainer}>
                                        <table className={styles.tableBody}>
                                            <colgroup>
                                                <col width='20%'/>
                                                <col width='20%'/>
                                                <col width='60%'/>
                                            </colgroup>
                                            <tbody className={styles.tbody}>
                                            {
                                                searchResults && searchResults.map((v,i)=>{
                                                    return <tr key={i} className={styles.tr} onClick={()=>{
                                                        addProblem(i, v.problem_id);
                                                    }}>
                                                        <td className={styles.td}>{v.problem_id}</td>
                                                        <td className={styles.td}>
                                                            <span className={cm(styles.tierIcon, `${DesignUtils.getTierIconClass(v.level)}`)}></span>
                                                        </td>
                                                        <td className={styles.td}>{v.title}</td>
                                                    </tr>
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayerModal>
    )
}