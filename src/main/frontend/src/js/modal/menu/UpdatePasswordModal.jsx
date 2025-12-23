import {MenuModal} from "../MenuModal";
import Modal from "../../../css/modal.module.css"
import {useApi} from "../../api/useApi";
import useModal from "../../setup/hook/useModal";
import {ModalType} from "../../setup/modal/ModalType";
import {useState} from "react";
import {cm} from "../../setup/utils/cm";

export function UpdatePasswordModal(props){
    const modal = useModal()
    const [orgPassword, setOrgPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState(false)
    const {userApi} = useApi();

    const onUpdatePassword = ()=>{
        if(!orgPassword || !newPassword){
            setError(true);
            return;
        }
        userApi.updatePassword(props.id, orgPassword, newPassword).then(({status})=>{
            if(status === 302 || status === 200){
                modal.openModal(ModalType.SNACKBAR.Info, {
                    msg: "비밀번호가 변경되었습니다."
                })
                setOrgPassword("");
                setNewPassword("");
                setError(false);
                modal.closeModal(ModalType.MENU.Update_Password);
            }else{
                setError(true);
            }
        }).catch(()=>{
            setError(true);
        })
    }

    return (
        <MenuModal {...props}>
            <div className={Modal.update_password}>
                <div className={Modal.update_password_label}>비밀번호 수정</div>
                <input 
                    type="password" 
                    className={cm(Modal.inp_password, `${error && Modal.error}`)}
                    placeholder="기존 비밀번호"
                    value={orgPassword} 
                    onChange={e=>{
                        setOrgPassword(e.target.value)
                        setError(false)
                    }}
                />
                <input 
                    type="password" 
                    className={cm(Modal.inp_password, `${error && Modal.error}`)}
                    placeholder="새 비밀번호"
                    value={newPassword} 
                    onChange={e=>{
                        setNewPassword(e.target.value)
                        setError(false)
                    }}
                />
                <button className={Modal.btn_password_update}
                    onClick={onUpdatePassword}
                >
                    비밀번호 수정
                </button>
            </div>
        </MenuModal>
    )
}

