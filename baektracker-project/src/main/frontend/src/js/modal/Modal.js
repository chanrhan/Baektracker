import {useEffect, useRef} from "react";
import ModalComponent from "react-modal"
import Popup from "../../../css/popup.module.css"

export function Modal({scrollable, children}){
    const modalRef = useRef(null)

    useEffect(() => {

    }, []);

    return (
        <ModalComponent className={Popup.popup}>

        </ModalComponent>
    )
}