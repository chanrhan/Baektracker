import {MenuModal} from "../MenuModal";
import Modal from "../../../css/modal.module.css"
import {useApi} from "../../api/useApi";
import useModal from "../../setup/hook/useModal";
import {ModalType} from "../../setup/modal/ModalType";
import {useState} from "react";
import {cm} from "../../setup/utils/cm";

export function GrantPassMenuModal(props){
    const modal = useModal()
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const {weeklyResultApi} = useApi();

    const onGrantPass = (state)=>{
        if(!password){
            setError(true);
            return;
        }
        weeklyResultApi.updateWeekPass(props.id, state, password).then(({status})=>{
            if(status === 302 || status === 200){
                if(props.onSubmit){
                    props.onSubmit();
                }
                modal.closeModal(ModalType.MENU.Grant_Pass);
            }else{
                setError(true);
            }
        }).catch(()=>{
            setError(true);
        })
    }

    return (
        <MenuModal {...props}>
            <div className={Modal.grant_pass}>
                <div className={Modal.grant_pass_label}>Week-Pass 설정</div>
                <input 
                    type="password" 
                    className={cm(Modal.inp_password, `${error && Modal.error}`)}
                    placeholder="비밀번호를 입력하세요."
                    value={password} 
                    onChange={e=>{
                        setPassword(e.target.value)
                        setError(false)
                    }}
                />
                <div className={Modal.grant_pass_buttons}>
                    <button className={Modal.btn_weekpass_set}
                        onClick={()=>onGrantPass(1)}
                    >
                        설정
                    </button>
                    <button className={Modal.btn_weekpass_cancel}
                        onClick={()=>onGrantPass(0)}
                    >
                        해제
                    </button>
                </div>
            </div>
        </MenuModal>
    )
}
