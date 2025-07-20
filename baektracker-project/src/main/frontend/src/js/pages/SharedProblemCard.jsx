import styles from '../../css/styles.module.css'
import {cm} from "../setup/utils/cm";
import {DesignUtils} from "../coding_study/DesignUtils";

export default function SharedProblemCard({id, level, title, rankList}){
    return (
        <div className={styles.problemCard}>
          {/* Problem Info Frame */}
          <div className={styles.infoContainer}>
            <div className={styles.infoFrame}>
              {/* Tier Accent */}
              <div 
                className={styles.bronzeAccent}
                style={{ backgroundColor: `${DesignUtils.getTierColor(level)}` }}
              ></div>
              
              {/* Content */}
              <div className={styles.content}>
                {/* Tier Icon Container */}
                <div className={styles.tierIconContainer}>
                  <div className={cm(styles.tierIcon, DesignUtils.getLevelIconClass(level))}></div>
                  
                  {/* Problem Number */}
                  <div className={styles.problemNumber}>{id}</div>
                  
                  {/* Problem Title */}
                  <div className={styles.problemTitle}>{title}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Rankings Table */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeaderRow}>
                  <th className={styles.headerRank}>순위</th>
                  <th className={styles.headerName}>이름</th>
                  <th className={styles.headerTime}>시간</th>
                  <th className={styles.headerMemory}>메모리</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {rankList && rankList.map((ranking, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td className={styles.rank}>{ranking.rank}</td>
                    <td className={styles.name}>{ranking.name}</td>
                    <td className={styles.time}>{ranking.time}</td>
                    <td className={styles.memory}>{ranking.memory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    )
}   