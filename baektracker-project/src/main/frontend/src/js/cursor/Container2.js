import React from 'react';
import styles from "../../css/style.module.css"

const ContainerV2 = () => {
    return (
        <div className={styles.containerV2}>
            {/* Top Header */}
            <div className={styles.topHeader}></div>

            {/* Root Container */}
            <div className={styles.rootCont}>
                {/* Sidebar Container */}
                <div className={styles.sidebarCont}>
                    <h1 className={styles.title}>HANCO</h1>

                    {/* Fine List Section */}
                    <div className={styles.fineList}>
                        <h2 className={styles.fineListTitle}>명예의 전당</h2>
                        <p className={styles.totalDonation}>총 기부금 : 10000원</p>

                        {/* Fine Table */}
                        <table className={styles.fineTable}>
                            <thead>
                            <tr>
                                <th className={styles.rankHeader}>순위</th>
                                <th className={styles.nameHeader}>이름</th>
                                <th className={styles.amountHeader}>금액</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className={styles.fineTableRow}>
                                <td className={styles.rank}>1</td>
                                <td className={styles.name}>박희찬</td>
                                <td className={styles.amount}>4000원</td>
                            </tr>
                            <tr className={styles.fineTableRow}>
                                <td className={styles.rank}>2</td>
                                <td className={styles.name}>이수성</td>
                                <td className={styles.amount}>4000원</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Main Container */}
                <div className={styles.mainCont}>
                    {/* Main Header */}
                    <div className={styles.mainHeader}>
                        {/* Date Panel */}
                        <div className={styles.datePanel}>
                            <span className={styles.dateRange}>2025-07-14 ~ 2025-07-20</span>
                        </div>

                        {/* Button Panel */}
                        <div className={styles.buttonPanel}>
                            <button className={styles.activeButton}>오늘</button>
                            <button className={styles.inactiveButton}>날짜 선택</button>
                        </div>
                    </div>

                    {/* Service Container */}
                    <div className={styles.serviceCont}>
                        {/* Public Container */}
                        <div className={styles.publicCont}>
                            {/* Weekly Shared Problem Panel */}
                            <div className={styles.weeklySharedProblemPanel}>
                                <div className={styles.wspHeader}>
                                    <h3 className={styles.wspTitle}>주간 공통 문제</h3>
                                </div>
                                <div className={styles.wspBody}>
                                    {/* Shared Problem Items */}
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className={styles.sharedProblemItem}>
                                            <div className={styles.problemHeader}>
                                                <div className={styles.problemRank}>
                                                    <span className={styles.rankIcon}>🏆</span>
                                                    <span className={styles.problemNumber}>2638</span>
                                                </div>
                                                <div className={styles.problemTitle}>
                                                    <span className={styles.problemName}>치즈</span>
                                                </div>
                                                <p className={styles.problemSolvers}>4명이 풀었습니다</p>
                                            </div>
                                            <table className={styles.problemRanking}>
                                                <thead>
                                                <tr className={styles.rankingHeader}>
                                                    <th>순위</th>
                                                    <th>이름</th>
                                                    <th>시간</th>
                                                    <th>메모리</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr className={styles.rankingRow}>
                                                    <td>1</td>
                                                    <td>박희찬</td>
                                                    <td>500ms</td>
                                                    <td>100KB</td>
                                                </tr>
                                                <tr className={styles.rankingRow}>
                                                    <td>2</td>
                                                    <td>서영광</td>
                                                    <td>1024ms</td>
                                                    <td>50KB</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Weekly Rank Panel */}
                            <div className={styles.weeklyRankPanel}>
                                <div className={styles.wrHeader}>
                                    <h3 className={styles.wrTitle}>주간 순위</h3>
                                </div>
                                <div className={styles.wrBody}>
                                    <div className={styles.rankItemBig}>
                                        <div className={styles.rankAvatar}></div>
                                        <span className={styles.rankName}>엄희용</span>
                                        <span className={styles.rankScore}>80점</span>
                                    </div>
                                    <div className={styles.rankItemMedium}>
                                        <div className={styles.rankAvatar}></div>
                                        <span className={styles.rankName}>박희찬</span>
                                        <span className={styles.rankScore}>50점</span>
                                    </div>
                                    <div className={styles.rankItemSmall}>
                                        <div className={styles.rankAvatar}></div>
                                        <span className={styles.rankName}>김영일</span>
                                        <span className={styles.rankScore}>40점</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Proc Panel */}
                        <div className={styles.procPanel}>
                            {/* Problem Items */}
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <div key={item} className={styles.problemItem}>
                                    <div className={styles.privateInfoSection}>
                                        <div className={styles.userInfo}>
                                            <div className={styles.userBadge}></div>
                                            <span className={styles.userName}>강윤민</span>
                                            <div className={styles.streakInfo}>
                                                <span className={styles.fireIcon}>🔥</span>
                                                <span className={styles.streakCount}>2</span>
                                            </div>
                                            <div className={styles.userIcons}>
                                                <div className={styles.userIcon}></div>
                                                <div className={styles.userIcon}></div>
                                            </div>
                                        </div>
                                        <span className={styles.problemsResolved}>322문제 해결</span>
                                    </div>
                                    <div className={styles.procSection}>
                                        <div className={styles.procBar}>
                                            <div className={styles.procBarFill}></div>
                                        </div>
                                        <span className={styles.procText}>(20 / 60)</span>
                                        <div className={styles.procIcon}></div>
                                    </div>
                                    <div className={styles.solvedLogSection}>
                                        {[1, 2, 3, 4, 5].map((result) => (
                                            <div key={result} className={styles.resultItem}>
                                                <div className={styles.resultBadge}></div>
                                                <span className={styles.resultText}>11428</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContainerV2;