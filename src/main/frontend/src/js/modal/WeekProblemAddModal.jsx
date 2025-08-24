import React, {useEffect, useState} from "react"
import styles from "../../css/styles.module.css"
import {LayerModal} from "./LayerModal";
import useModal from "../setup/hook/useModal";
import {ModalType} from "../setup/modal/ModalType";
import {DesignUtils} from "../utils/DesignUtils";
import {cm} from "../setup/utils/cm";
import {useApi} from "../api/useApi";
import {ObjectUtils} from "../setup/utils/ObjectUtil";

export function WeekProblemAddModal(props){
  const modal = useModal();
  const {problemApi} = useApi()
  const [items, setItems] = useState(props.problems ? [...props.problems] : [])

  const [keyword, setKeyword] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const delayDebounceTimer = setTimeout(()=>{
      searchProblems()
    }, 500)
    return ()=>{
      clearTimeout(delayDebounceTimer)
    }
  }, [keyword]);

  const searchProblems = ()=>{
    if(ObjectUtils.isEmpty(keyword)){
        setSearchResults(null)
        return
    }
    problemApi.searchProblems(keyword).then(({data})=>{
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
      title: searchResults[index].titleKo
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
    problemApi.updateWeeklyProblem(props.date, body).then(({data})=>{
      if(!data){
        modal.openModal(ModalType.SNACKBAR.Alert, {
          msg: "문제가 발생했습니다. 다시 시도해주세요"
        })
        return
      }
      modal.openModal(ModalType.SNACKBAR.Info, {
        msg: "저장되었습니다"
      })

      props.onSubmit();
      modal.closeModal(ModalType.LAYER.WeeklyProblemDetail)
    })
  }

  const cancel = ()=>{
    modal.closeModal(ModalType.LAYER.WeeklyProblemDetail)
  }


  return (
      <LayerModal {...props} maxWidth={800} minWidth={600} top={25}>
        <div className={styles.problemModalHeader}>
          <h2 className={styles.problemModalTitle}>
            <div className={styles.select_date_text}>
              {props.fromDate} ~ {props.toDate}
            </div>
            문제 출제</h2>
          <div style={{
            display: 'flex'
          }}>
            <button className={styles.problemModalCloseButton} onClick={cancel}>
              취소
            </button>
            <button className={styles.problemModalCloseButton} onClick={submit} style={{
              color: '#2563eb'
            }}>
              저장
            </button>
          </div>
        </div>

        <div className={styles.problemModalContent}>
          <div className={styles.problemModalSearchSection}>
            <div className={styles.problemModalSearchInput}>
              <input
                  type="text"
                  placeholder="문제 번호 또는 제목을 입력하세요"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && searchProblems()}
              />
              {/*<button onClick={searchProblems}>검색</button>*/}
            </div>
          </div>
          <div className={styles.selectedProblemSection}>
            <ul className={styles.selected_problem_list}>
              {
                items && items.map((v,i)=>{
                  return (
                      <div key={v.id} className={styles.added_weeklyProblemsCard} onClick={()=>{
                        deleteProblem(i)
                      }}>
                        <div
                            className={styles.weeklyProblemsAccentBar}
                            style={{backgroundColor: DesignUtils.getTierColor(v.level)}}
                        />
                        <div className={styles.weeklyProblemsHeader}>
                          <div className={styles.weeklyProblemsInfo}>
                            <span
                                className={cm(styles.tierIcon, `${DesignUtils.getTierIconClass(v.level)}`)}></span>
                            {/*<TierIcon tier={problem.level} size="small" showText={true}/>*/}
                            <h3 className={styles.weeklyProblemsTitle}>
                              #{v.problem_id} {v.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                  )
                  })
              }
            </ul>
          </div>

          <div className={styles.problemModalResultsSection}>
            {
              searchResults && searchResults.length > 0 && (
                    <>
                      <h3 className={styles.problemModalResultsTitle}>검색 결과 ({searchResults ? searchResults.length : 0}개)</h3>
                      <div className={styles.problemModalProblemList}>
                        {searchResults.map((v, index) => (
                            <div key={index} className={styles.problemModalProblemItem}>
                              <div className={styles.problemModalProblemInfo}>
                                <span className={cm(styles.tierIcon, `${DesignUtils.getTierIconClass(v.level)}`)}></span>
                                <span className={styles.problemModalProblemNumber}>#{v.problemId}</span>
                                <span className={styles.problemModalProblemTitle}>{v.titleKo}</span>
                              </div>
                              <div className={styles.problemModalProblemStats}>
                    <span className={styles.problemModalSolvedCount}>
                      {v.solved_count}명 해결
                    </span>
                                <button
                                    className={styles.problemModalAddButton}
                                    onClick={() => {
                                      addProblem(index, v.problemId)
                                    }}>
                                  추가
                                </button>
                              </div>
                            </div>
                        ))}
                      </div>
                    </>
                )
            }

          </div>

          <div className={styles.problemModalFooter}>
            <p className={styles.problemModalLimitInfo}>
              주간 문제는 최대 3개까지 출제할 수 있습니다.
            </p>
          </div>
        </div>
      </LayerModal>
  )
}