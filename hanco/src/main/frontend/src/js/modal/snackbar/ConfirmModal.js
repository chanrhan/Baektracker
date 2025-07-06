import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import useModal from "../../setup/hook/useModal";
import Modal from "../../../css/modal.module.css"
import {ModalType} from "../../setup/modal/ModalType";
import {cm} from "../../setup/utils/cm";

export function ConfirmModal(props){
    const modal = useModal();
    const timeout = 100000; // 3sec
    const loc = useLocation()

    const [gage, setGage] = useState(130)
    const [fadeout, setFadeOut] = useState(null)


    useEffect(() => {
        return ()=>{
            setFadeOut(Modal.fade_out)
        }
    }, []);

    // useEffect(() => {
    //     let intervalId;
    //     if(gage > 0){
    //         intervalId = setInterval(()=>{
    //             setGage(gage - (130 / ((timeout*0.78)/10)));
    //             if(gage <= 0){
    //                 clearInterval(intervalId);
    //             }
    //         }, 10)
    //     }
    //     return ()=>{
    //         clearInterval(intervalId)
    //     }
    // }, [gage]);
    //
    // useEffect(() => {
    //     const timer = setTimeout(()=>{
    //         close();
    //     }, timeout)
    //     return ()=>{
    //         clearTimeout(timer)
    //     }
    // }, []);

    const close = ()=>{
        setFadeOut(Modal.fade_out)
        setTimeout(()=>{
            modal.closeModal(ModalType.MENU.Confirm)
        },200)
    }

    const onSubmit =()=>{
        if(props.onSubmit){
            props.onSubmit();
        }
        close();
    }

    return (
        <div className={cm(Modal.menu_confirm, fadeout)} {...props}>
            <div className={Modal.confirm}>
                <div className={Modal.progress_cont}>
                    {
                        props.progress && (
                            <div className={Modal.progress_bar} style={{
                                width: `${gage}%`,
                                backgroundColor: props.progress.bar_color
                            }}></div>
                        )
                    }
                </div>

                <div className={Modal.confirm_msg_box}>
                    <span className={Modal.warning_icon}> </span>
                    <span className={Modal.confirm_msg}>
                        {props.msg}
                    </span>
                </div>

                <div className={Modal.btn_box}>
                    <button type='button' className={Modal.btn} style={{
                        backgroundColor: props.btn_color,
                    }} onClick={onSubmit}>{props.btn_submit_name}</button>
                    <button type='button' className={cm(Modal.btn_grey, Modal.btn)} onClick={close}>취소</button>
                </div>
            </div>
        </div>
    )
}