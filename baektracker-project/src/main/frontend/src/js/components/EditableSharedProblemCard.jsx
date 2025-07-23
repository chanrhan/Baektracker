import styles from "../../css/styles.module.css";
import {useEffect, useState} from "react";
import {cm} from "../setup/utils/cm";
import {DesignUtils} from "../utils/DesignUtils";

export function EditableSharedProblemCard({level, id, title, onClick}){
    const [tags, setTags] = useState([])
    const [fontSize, setFontSize] = useState(20); // 기본 폰트 크기

    useEffect(() => {
        const calculateFontSize = () => {
            const textLength = title?.length || 0;
            const baseSize = 22; // 기본 폰트 크기
            const minSize = 14; // 최소 폰트 크기
            const maxSize = 24; // 최대 폰트 크기

            // 글자 길이에 따라 폰트 크기 조절 (예시)
            let newSize = baseSize - (textLength - 10) * 0.5; // 글자 수가 많아질수록 폰트 크기 감소
            newSize = Math.max(minSize, Math.min(maxSize, newSize)); // 최소, 최대 크기 제한

            setFontSize(newSize);
        };

        calculateFontSize();
    }, [title]);

    return (
        <div className={styles.problemCardItem} onClick={onClick}>
            {
                id ? <>
                    <div className={styles.cardAccentBar} style={{
                        backgroundColor: `${DesignUtils.getTierColor(level)}`
                    }}></div>
                    <div className={styles.cardContent}>
                        <div className={styles.cardInfoSection}>
                            <div className={styles.tierIconFrame}>
                                <div className={cm(styles.tierIcon, `${DesignUtils.getTierIconClass(level)}`)}></div>
                            </div>
                            <div className={styles.problem_number_label_box}>
                                <span className={styles.problemNumber}>{id}</span>
                                {
                                    tags && tags.map((v,i)=> {
                                        return <span className={styles.statusTag}></span>
                                    })
                                }
                            </div>
                            <div className={styles.problemTitle} style={{fontSize: `${fontSize}px`}}>{title}</div>
                        </div>

                    </div>
                </> : (
                    <div>

                    </div>
                )
            }

        </div>
    )
}