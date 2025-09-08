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
    const [checked, setChecked] = useState(false)
    const [error, setError] = useState(false)
    const {userApi} = useApi();

    const onSubmit = (e)=>{
        console.log(checked)
        userApi.grantPassThisWeek(props.id, checked ? 0 : 1, password).then(({data})=>{
            console.log(data)
            if(data){
                if(props.onSubmit){
                    props.onSubmit();
                }
                modal.closeModal(ModalType.MENU.Grant_Pass);
            }else{
                setError(true);
            }
        })
    }

    return (
        <MenuModal {...props}>
            <div className={Modal.grant_pass}>
                <div>
                    <div>이번주 패스 (<input type="checkbox" checked={checked} onClick={()=>{
                        setChecked(!checked)
                    }}/> 체크하면 패스 취소) </div>
                    <input type="text" className={cm(Modal.inp_password, `${error && Modal.error}`)}
                           value={password} onChange={e=>{
                               setPassword(e.target.value)
                    }}/>
                </div>
                <button type="button" className={Modal.btn_submit} onClick={onSubmit}>확인</button>
            </div>
        </MenuModal>
    )
}