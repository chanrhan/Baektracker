import Header from "./Header";
import PublicSection from "./PublicSection";
import PrivateSection from "./PrivateSection";
import styles from '../../css/styles.module.css'

export function Main(){
    return (
        <div className={styles.pageContainer}>
            <Header/>
            <div className={styles.body}>
                <PublicSection/>
                <PrivateSection/>
            </div>
        </div>
    )
}