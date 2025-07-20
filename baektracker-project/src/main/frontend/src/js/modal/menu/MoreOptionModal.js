import Popup from "../../../css/popup.module.css"
import React, {useEffect} from "react";
import {ModalType} from "../../setup/modal/ModalType";
import useModal from "../../setup/hook/useModal";
import {cmc} from "../../setup/utils/cm";
import {MenuModal} from "../MenuModal";

export function MoreOptionModal(props){

    const modal = useModal();

    const close = (action)=>{
        if(props.onSubmit){
            props.onSubmit(action);
        }
        modal.closeModal(ModalType.MENU.More_Option)
    }

    useEffect(() => {
        return ()=>{
            if(props.onSubmit){
                props.onSubmit();
            }
        }
    }, []);

    return (
        <MenuModal modalRef={props.modalRef} top={props.top} left={props.left}>
            <div className={'select_box'}>
                <ul className={`select_layer add_icon left ${cmc(Popup.active)}`}>
                    <li className={`select_item ${Popup.more_select_item}`}>
                        <button type="button" className={`tool_btn ${Popup.button}`} onClick={e => {
                            close(0);
                        }}>수정
                        </button>
                    </li>
                    <li className={`select_item ${Popup.more_select_item}`}>
                        <button type="button" className={`tool_btn ${Popup.button}`} onClick={e => {
                            close(1);
                        }}>삭제
                        </button>
                    </li>
                </ul>
            </div>
        </MenuModal>
    )
}