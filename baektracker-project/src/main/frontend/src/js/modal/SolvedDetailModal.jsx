import {LayerModal} from "./LayerModal";
import useModal from "../setup/hook/useModal";
import Popup from "../../css/popup.module.css"
import {cm} from "../setup/utils/cm";
import {DesignUtils} from "../utils/DesignUtils";
import useApi from "../setup/hook/useApi";
import {useEffect, useState} from "react";
import {useRenderlessModal} from "../setup/hook/useRenderlessModal";

export function SolvedDetailModal(props){
    const modal = useModal();
    const leftScButton = useRenderlessModal('LeftScBtn_'+props)
    const rightScButton = useRenderlessModal('RightScBtn_'+props)
    const {problemApi} = useApi()

    const [leftUserId, setLeftUserId] = useState(props.user_id)
    const [leftUserName, setLeftUserName] = useState(null)
    const [rightUserId, setRightUserId] = useState('')
    const [rightUserName, setRightUserName] = useState('')

    const [users, setUsers] = useState([])
    const [codeSource, setCodeSource] = useState(<div></div>)

    useEffect(() => {
        getUsersByProblem()
        getProblemSource()
    }, [leftUserId]);

    const getUsersByProblem = ()=>{
        problemApi.getUsersByProblem(props.problem_id).then(({data})=>{
            console.table(data)
            if(data){
                setUsers(data)
                for(const v of data){
                    if(v.user_id == leftUserId){
                        setLeftUserName(v.name)
                        break;
                    }
                }
            }
        })
    }

    const getProblemSource = ()=>{
        problemApi.getProblemSource(props.submit_id).then(({data})=>{
            if(data){
                setCodeSource(data)
            }
        })
    }

    const reloadCodeSource = ()=>{
        getProblemSource()
    }

    const getUserInfo = ()=>{
        for(const v of users){
            if(v.user_id == leftUserId){
                return v;
            }
        }
        return null;
    }

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
                                <button type='button' className={Popup.btn_select_user}
                                        onClick={leftScButton.clickToOpen}>{leftUserName}</button>
                                <button type='button' className={Popup.btn_reload} onClick={reloadCodeSource}></button>
                                <ul ref={leftScButton.ref} className={cm(Popup.menu_bg, `${leftScButton.active && Popup.active}`)}>
                                    {
                                        users && users.map((v,i)=>{
                                            if(v.user_id == leftUserId){ // 동일 유저는 선택 메뉴에 안뜨도록
                                                return null;
                                            }
                                            return <li className={Popup.menu_item} onClick={()=>{
                                                setLeftUserId(v.user_id)
                                                leftScButton.close();
                                            }}>
                                                <span>{v.name}</span>
                                                <span>{v.lang}</span>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className={Popup.info_section}>
                                <div className={Popup.lang_text}>{getUserInfo()?.lang ?? 'N/A'}</div>
                                <div className={Popup.lang_text}>{getUserInfo()?.elapsed_tm}ms</div>
                                <div className={Popup.lang_text}>{getUserInfo()?.used_mem}KB</div>
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
                        {codeSource}
                    </div>
                    <div className={Popup.right_code_panel}>

                    </div>
                </div>
            </div>
        </LayerModal>
    )
}