import styles from '../../css/styles.module.css'
import {cm} from "../setup/utils/cm";
import {DesignUtils} from "../utils/DesignUtils";
import {useEffect, useRef, useState} from "react";
import useModal from "../setup/hook/useModal";
import {ModalType} from "../setup/modal/ModalType";

export default function SharedProblemCard({id, level, title, rankList}){
  // const [text, setText] = useState();
  const modal = useModal();
  const [fontSize, setFontSize] = useState(20); // 기본 폰트 크기

  useEffect(() => {
    const calculateFontSize = () => {
      const textLength = title?.length || 0;
      const baseSize = 18; // 기본 폰트 크기
      const minSize = 10; // 최소 폰트 크기
      const maxSize = 20; // 최대 폰트 크기

      // 글자 길이에 따라 폰트 크기 조절 (예시)
      let newSize = baseSize - (textLength - 10) * 0.5; // 글자 수가 많아질수록 폰트 크기 감소
      newSize = Math.max(minSize, Math.min(maxSize, newSize)); // 최소, 최대 크기 제한

      setFontSize(newSize);
    };

    calculateFontSize();
  }, [title]);

    const openSolvedDetailModal = ()=>{
        // modal.openModal(ModalType.SNACKBAR.Alert, {
        //   msg: '뭐 임마?'
        // })
      modal.openModal(ModalType.LAYER.SolvedDetail, {
          problem_id: id,
          level: level,
          title: title,
      })
    }
    
    return (
        <div className={styles.problemCard}>
          {/* Problem Info Frame */}
          <div className={styles.infoContainer} onClick={()=>{
              if(id)
                window.open(`https://www.acmicpc.net/problem/${id}`, "_blank")
          }}>
            <div className={styles.infoFrame}>
              {/* Tier Accent */}
                {
                    id && <div
                        className={styles.bronzeAccent}
                        style={{backgroundColor: `${DesignUtils.getTierColor(level)}`}}
                    ></div>
                }

                {/* Content */}
                <div className={styles.content}>
                    {/* Tier Icon Container */}
                    <div className={styles.tierIconContainer}>
                        {
                            id && <div className={cm(styles.tierIcon, DesignUtils.getLevelIconClass(level))}></div>
                        }
                        <div className={styles.problemNumber} style={
                            !id ? {
                                marginTop: '14%',
                                fontSize: '16px',
                                color: '#adadad',
                                textAlign: 'center',
                                marginLeft: '-4px'
                            } : {}
                        }>{id ? id : "문제가 등록되지 않았습니다"}</div>
                        <div className={styles.problemTitle} style={{fontSize: `${fontSize}px`}}>{title}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Rankings Table */}
          <div className={styles.tableContainer}>
            {
                id && <table className={styles.table}>
                  <thead>
                  <tr className={styles.tableHeaderRow}>
                    <th className={styles.headerRank}>순위</th>
                    <th className={styles.headerName}>이름</th>
                    <th className={styles.headerTime}>시간</th>
                    {/* <th className={styles.headerMemory}>메모리</th> */}
                  </tr>
                  </thead>
                  <tbody className={styles.tableBody}>
                  {rankList && rankList.map((ranking, index) => {
                    return (
                        <tr key={index} className={cm(styles.tableRow, `${ranking.is_other_week === 1 && styles.prev_week}`)} onClick={openSolvedDetailModal}>
                          <td className={styles.rank}>{ranking.rank}</td>
                          <td className={styles.name}>{ranking.user_name}</td>
                          <td className={styles.time}>{ranking.time}</td>
                          {/* <td className={styles.memory}>{ranking.mem}</td> */}
                        </tr>
                    )
                  })}
                  </tbody>
                </table>
            }
          </div>
        </div>
    )
}   