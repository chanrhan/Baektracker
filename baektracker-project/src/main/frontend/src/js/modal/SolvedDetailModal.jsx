import {LayerModal} from "./LayerModal";
import useModal from "../setup/hook/useModal";
import Popup from "../../css/popup.module.css"
import styles from "../../css/styles.module.css"
import {cm} from "../setup/utils/cm";
import {DesignUtils} from "../utils/DesignUtils";

export function SolvedDetailModal(props){
    const modal = useModal();

    return (
        <LayerModal {...props} maxWidth={1450} height={845} top={10} backgroundColor={`#171717`}>
            <div className={Popup.solved_detail_cont}>
                <div className={Popup.top_cont}>
                    <div className={Popup.detail_panel}>
                        <div className={cm(Popup.rank_icon, `${DesignUtils.getTierIconClass(props.level)}`)}></div>
                        <div className={Popup.problem_num}>{props.problem_id}</div>
                        <div className={Popup.problem_title}>{props.title}</div>
                    </div>
                    <div className={Popup.option_header_group}>
                        <div className={Popup.left_code_option_panel}>
                            <div className={Popup.select_section}>
                                <button type='button' className={Popup.btn_select_user}>박희찬</button>
                            </div>
                            <div className={Popup.info_section}>
                                <div className={Popup.lang_text}>java</div>
                                <div className={Popup.lang_text}>10000ms</div>
                                <div className={Popup.lang_text}>250KB</div>
                            </div>
                        </div>
                        <div className={Popup.right_code_option_panel}>
                            <div className={Popup.info_section}>
                                <div className={Popup.lang_text}>python</div>
                                <div className={Popup.lang_text}>200ms</div>
                                <div className={Popup.lang_text}>170KB</div>
                            </div>
                            <div className={Popup.select_section}>
                                <button type='button' className={Popup.btn_select_user}>엄희용</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Popup.bottom_cont}>
                    <div className={Popup.left_code_panel}>

                    </div>
                    <div className={Popup.right_code_panel}>

                    </div>
                </div>
            </div>
        </LayerModal>
    )
}