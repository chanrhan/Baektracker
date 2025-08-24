import {useEffect, useState} from "react";
import Modal from "../../css/modal.module.css"


export const SnackbarModal = ({children, top, left, width, height, className, close, timeout})=>{
    const [fadeout, setFadeOut] = useState(null)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setFadeOut(Modal.fade_out)
        }, timeout)

        return ()=>{
            clearTimeout(timer);
        }
    },[])

    useEffect(()=>{
        let timer;
        if(fadeout !== null){
            timer = setTimeout(close, 400)
        }
        return ()=>{
            clearTimeout(timer);
        }
    },[fadeout])

    return (
        <div >
            <div className={`${Modal.modal_snackbar} ${className} ${Modal.active} ${fadeout}`} style={
                {
                    top: `${top}px`,
                    left: `${left}px`,
                    width: `${width}px`,
                    height: `${height}px`
                }
            }>
                {children}
            </div>
        </div>

    )
}