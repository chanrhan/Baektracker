import styles from "../../css/styles.module.css";
import PublicSection from "./PublicSection";
import PrivateSection from "./PrivateSection";
import useApi from "../setup/hook/useApi";

export function MainBody({fromDate, toDate}){
    const {solvedAcApi} = useApi();



    return (
        <div className={styles.body}>
            <PublicSection fromDate={fromDate} toDate={toDate}/>
            <PrivateSection fromDate={fromDate} toDate={toDate}/>
        </div>
    )
}