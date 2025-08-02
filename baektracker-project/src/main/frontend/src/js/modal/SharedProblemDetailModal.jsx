import {LayerModal} from "./LayerModal";
import {useEffect, useState} from "react";
import useApi from "../setup/hook/useApi";
import useModal from "../setup/hook/useModal";
import {ModalType} from "../setup/modal/ModalType";
import styles from "../../css/styles.module.css"

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
            modal.openModal(ModalType.SNACKBAR.Alert, {
                msg: "더 이상 추가할 수 없습니다!"
            })
            return;
        }
        for(const it of items){
            if(it.id === id){
                modal.openModal(ModalType.SNACKBAR.Alert, {
                    msg: "중복된 문제입니다!"
                })
                return;
            }
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
        const body = items.map((v,i)=>{
            return v.problem_id
        })
        problemApi.updateSharedProblem(props.date, body).then(({data})=>{
            let msg = "문제가 발생했습니다. 다시 시도해주세요";
            if(data){
                msg = "주간 공통 문제를 수정했습니다!"
            }
            modal.openModal(ModalType.SNACKBAR.Alert, {
                msg: msg
            })
            props.onSubmit();
            modal.closeModal(ModalType.LAYER.SharedProblemDetail)
        })
    }

    const cancel = ()=>{
        modal.closeModal(ModalType.LAYER.SharedProblemDetail)
    }

    return (
        <LayerModal {...props} maxWidth={1000} height={800} maxHeight={1400} top={5} backgroundColor={`rgba(51, 54, 61, 0)`}>
            <div className={styles.sharedProblemManageModal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>문제 출제</h2>
                    <button className={styles.closeButton}>
                        ✕
                    </button>
                </div>

                <div className={styles.content}>
                    <div className={styles.searchSection}>
                        <div className={styles.searchInput}>
                            <input
                                type="text"
                                placeholder="문제 번호 또는 제목으로 검색"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                // onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            />
                            <button onClick={searchProblems}>검색</button>
                        </div>
                    </div>

                    <div className={styles.resultsSection}>
                        <h3 className={styles.resultsTitle}>검색 결과</h3>
                        <div className={styles.problemList}>
                            {searchResults && searchResults.map((problem) => (
                                <div key={problem.number} className={styles.problemItem}>
                                    <div className={styles.problemInfo}>
                                        <span className={styles.problemNumber}>#{problem.number}</span>
                                        <span className={styles.problemTitle}>{problem.title}</span>
                                        <span className={styles.problemLevel}>{problem.level}</span>
                                    </div>
                                    <div className={styles.problemStats}>
                                        <span className={styles.solvedCount}>{problem.alreadySolved}명 풀이 완료</span>
                                        <button className={styles.addButton} onClick={submit}>
                                            출제
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <div className={styles.limitInfo}>
                            <span>이번 주 출제 가능한 문제: 1/3</span>
                        </div>
                    </div>
                </div>
                {/* 메인 프레임 */}
                {/*<div className={styles.modalMainFrame}>*/}
                {/*    /!* 헤더 섹션 *!/*/}
                {/*    <div className={styles.modalHeaderContainer2}>*/}
                {/*        <div className={styles.modalHeaderSection}>*/}
                {/*            <div className={styles.modalDateText}>2025-07-14 ~ 2025-07-21</div>*/}
                {/*            <div className={styles.modalTitleText}>최대 3개의 주간 공통 문제를 등록해주세요</div>*/}
                {/*        </div>*/}
                {/*        <div className={styles.btn_section}>*/}
                {/*            <button type='button' className={cm(styles.btn_cancel, styles.btn)} onClick={cancel}>취소</button>*/}
                {/*            <button type='button' className={cm(styles.btn_submit, styles.btn)} onClick={submit}>저장</button>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    /!* 본문 섹션 *!/*/}
                {/*    <div className={styles.modalBodySection}>*/}
                {/*        /!* 문제 카드 섹션 *!/*/}
                {/*        <div className={styles.problemCardsSection}>*/}
                {/*            /!* 문제 카드 1 *!/*/}
                {/*            {*/}
                {/*                [1,2,3].map((v,i)=>{*/}
                {/*                    const item = items[i];*/}
                {/*                    console.table(item)*/}
                {/*                    return <EditableSharedProblemCard key={i} level={item?.level}*/}
                {/*                                                      id={item?.problem_id} title={item?.title}*/}
                {/*                                                      onClick={()=>{*/}
                {/*                                                          deleteProblem(i)*/}
                {/*                    }}/>*/}
                {/*                })*/}
                {/*            }*/}
                {/*        </div>*/}

                {/*        /!* 검색/관리 섹션 *!/*/}
                {/*        <div className={styles.searchManageSection}>*/}
                {/*            <div className={styles.searchContainer}>*/}
                {/*                <div className={styles.searchHeader}>*/}
                {/*                    <input className={styles.searchInputFrame} value={keyword}*/}
                {/*                           placeholder='문제를 검색해주세요'*/}
                {/*                            onKeyPress={e=>{*/}
                {/*                                if(e.which === 13) {*/}
                {/*                                    searchProblems()*/}
                {/*                                }*/}
                {/*                            }}*/}
                {/*                           onChange={e=>{*/}
                {/*                        setKeyword(e.target.value)*/}
                {/*                    }}/>*/}
                {/*                </div>*/}
                {/*                <div className={styles.searchResultsArea}>*/}
                {/*                    <table className={styles.tableHeader}>*/}
                {/*                        <colgroup>*/}
                {/*                            <col width='20%'/>*/}
                {/*                            <col width='20%'/>*/}
                {/*                            <col width='60%'/>*/}
                {/*                        </colgroup>*/}
                {/*                        <thead className={styles.thead}>*/}
                {/*                            <tr className={styles.tr}>*/}
                {/*                                <th>번호</th>*/}
                {/*                                <th>레벨</th>*/}
                {/*                                <th>제목</th>*/}
                {/*                            </tr>*/}
                {/*                        </thead>*/}
                {/*                    </table>*/}
                {/*                    <div className={styles.tableBodyContainer}>*/}
                {/*                        <table className={styles.tableBody}>*/}
                {/*                            <colgroup>*/}
                {/*                                <col width='20%'/>*/}
                {/*                                <col width='20%'/>*/}
                {/*                                <col width='60%'/>*/}
                {/*                            </colgroup>*/}
                {/*                            <tbody className={styles.tbody}>*/}
                {/*                            {*/}
                {/*                                searchResults && searchResults.map((v,i)=>{*/}
                {/*                                    return <tr key={i} className={styles.tr} onClick={()=>{*/}
                {/*                                        addProblem(i, v.problem_id);*/}
                {/*                                    }}>*/}
                {/*                                        <td className={styles.td}>{v.problem_id}</td>*/}
                {/*                                        <td className={styles.td}>*/}
                {/*                                            <span className={cm(styles.tierIcon, `${DesignUtils.getTierIconClass(v.level)}`)}></span>*/}
                {/*                                        </td>*/}
                {/*                                        <td className={styles.td}>{v.title}</td>*/}
                {/*                                    </tr>*/}
                {/*                                })*/}
                {/*                            }*/}
                {/*                            </tbody>*/}
                {/*                        </table>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </LayerModal>
    )
}